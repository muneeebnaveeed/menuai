const sleep = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), duration);
  });
};

export default sleep;
