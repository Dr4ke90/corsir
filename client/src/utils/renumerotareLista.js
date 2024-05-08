export const renumerotareLista = (lista) => {
    return lista.map((item, index) => {
      return { ...item, nrCrt: index + 1 };
    });
  };