export class Pool {
  connect() {
    return {
      query() { return Promise.resolve() },
      release() { return Promise.resolve() },
    }
  }
};

export default {
  Pool,
};
