const idGenerator = function* () {
  let id = 1;
  while (true) {
    yield id++;
  }
};

const generateId = idGenerator();

export const getGenerateId = () => {
  return generateId.next().value
}
