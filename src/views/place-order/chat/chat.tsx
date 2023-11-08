import { useState, useLayoutEffect } from "react";
import { BeatLoader } from "react-spinners";
import { ChatMessageActions, ChatMessageTypes, IChatMessage } from "./types";
import ChatMessageBubble from "./chat-message-bubble";
import ChatMessageAction from "./chat-message-action";
import sleep from "../../../utils/sleep";
import usePlaceOrderContext from "../context";
import { MealCategories } from "../../../data/get-meals.data";
import cuid from "cuid";
import QueryKeys from "../../../constants/query-keys";
import { GetFlattenedPaginatedCache } from "../../../utils/cache";
import { IMeal } from "../../../schemas/meals.schema";

const Chat = () => {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [focusedMessage, setFocusedMessage] = useState<IChatMessage | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<ChatMessageActions | null>(null);

  const { setCurrentCategory, addToCart } = usePlaceOrderContext();

  const initChat = () => {
    const initialMessages: IChatMessage[] = [
      {
        id: cuid(),
        isUser: false,
        message: "",
        actions: [],
        type: ChatMessageTypes.INTRODUCTION,
      },
      {
        id: cuid(),
        isUser: false,
        message: "What would you like to have? Chicken, seafood? You name it!",
        actions: [
          {
            label: "Can I have something vegan?",
            value: ChatMessageActions.I_WANT_VEGAN,
          },
          {
            label: "Do you have something sweet?",
            value: ChatMessageActions.I_WANT_DESSERT,
          },
          {
            label: "I want a beef burger!",
            value: ChatMessageActions.I_WANT_BEEF_BURGER,
          },
        ],
      },
    ];

    setMessages(initialMessages);
    setFocusedMessage(initialMessages[initialMessages.length - 1]);
    setSelectedAction(null);
    setIsTyping(false);
  };

  useLayoutEffect(() => {
    initChat();
  }, []);

  useLayoutEffect(() => {
    setFocusedMessage(messages[messages.length - 1]);
  }, [messages]);

  return (
    <div className="bg-white w-full h-full overflow-hidden shadow-[0px_40px_72px_-8px_#0a090b12] border-r-4 border-independant-grey-subtle">
      <div className="flex flex-col  p-12 h-full">
        <div className="mb-12">
          <h2 className="text-independant-grey-active text-5xl font-bold">Assistant</h2>
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            {messages.map((e) => (
              <ChatMessageBubble key={e.id} data={e} />
            ))}
            {isTyping && (
              <div className="px-8 py-6 bg-gray-100 rounded-full text-xl leading-6">
                <div className="w-full flex justify-center">
                  <BeatLoader color="#FF6600" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          {focusedMessage?.actions.map((e) => (
            <ChatMessageAction
              key={e.value}
              data={e}
              isDisabled={!selectedAction ? false : selectedAction !== e.value}
              onClick={async (action) => {
                setSelectedAction(e.value);
                switch (action.value) {
                  case ChatMessageActions.I_WANT_VEGAN: {
                    setMessages(($) => [
                      ...$,
                      {
                        id: cuid(),
                        isUser: true,
                        message: e.label,
                        actions: [],
                      },
                    ]);

                    setIsTyping(true);
                    await sleep(2000);
                    setIsTyping(false);
                    setSelectedAction(null);

                    setCurrentCategory(MealCategories.VEGETARIAN);
                    setMessages(($) => [
                      ...$,
                      {
                        id: cuid(),
                        isUser: false,
                        message: "Absolutely! We have a variety of vegan dishes on our menu.",
                        actions: [],
                      },
                      {
                        id: cuid(),
                        isUser: false,
                        message: (
                          <>
                            Do you want our famous <span className="text-brand font-medium">Chickpea Fajitas</span>?
                          </>
                        ),
                        actions: [
                          {
                            label: "Yes, please",
                            value: ChatMessageActions.I_WANT_FAJITAS,
                          },
                          {
                            label: `I'll pass`,
                            value: ChatMessageActions.I_DONT_WANT_FAJITAS,
                          },
                        ],
                      },
                    ]);

                    break;
                  }
                  case ChatMessageActions.I_WANT_FAJITAS: {
                    setMessages(($) => [
                      ...$.slice(-2),
                      {
                        id: cuid(),
                        isUser: true,
                        message: e.label,
                        actions: [],
                      },
                    ]);

                    setIsTyping(true);
                    await sleep(2000);
                    setIsTyping(false);
                    setSelectedAction(null);

                    const vegetarianMeals = GetFlattenedPaginatedCache<IMeal>([QueryKeys.MEALS_BY_CATEGORY]);

                    const selectedMeal = vegetarianMeals.find((e) => e.idMeal === "52870")!;

                    addToCart(selectedMeal, 1);

                    setMessages(($) => [
                      ...$,
                      {
                        id: cuid(),
                        isUser: false,
                        message: "Perfect! Would you like sides with it?",
                        actions: [
                          {
                            label: "Yes",
                            value: ChatMessageActions.SIDES_WITH_FAJITAS,
                          },
                          {
                            label: "No",
                            value: ChatMessageActions.NO_SIDES_WITH_FAJITAS,
                          },
                        ],
                      },
                    ]);

                    break;
                  }
                  case ChatMessageActions.SIDES_WITH_FAJITAS: {
                    setMessages(($) => [
                      ...$,
                      {
                        id: cuid(),
                        isUser: true,
                        message: e.label,
                        actions: [],
                      },
                    ]);

                    setIsTyping(true);
                    setCurrentCategory(MealCategories.SIDE);
                    await sleep(2000);
                    setIsTyping(false);
                    setSelectedAction(null);

                    setMessages(($) => [
                      ...$,
                      {
                        id: cuid(),
                        isUser: false,
                        message: "Got you! Please choose a side meal from the available menu",
                        actions: [],
                      },
                    ]);

                    break;
                  }
                  default: {
                    setSelectedAction(null);
                    break;
                  }
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
