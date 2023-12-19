export const adaptTaskStatusStringToNumber = (stateId: number) => {
  switch (stateId) {
    case 1: {
      return 'Новая';
    }
    case 2: {
      return 'В работе';
    }
    case 3: {
      return 'Выполнено';
    }
    case 4: {
      return 'Отменена';
    }
    default: {
      return 'Новая';
    }
  }
};