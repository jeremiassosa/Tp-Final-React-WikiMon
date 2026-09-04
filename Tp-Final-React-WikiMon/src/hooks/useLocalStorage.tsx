import { useEffect, useState } from 'react';

export function useLocalStorage(clave:string , valorInicial:string) {
    const [valor, setValor] = useState(() => {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : valorInicial;
    });

    useEffect(() => {
    localStorage.setItem(clave, JSON.stringify(valor));
    }, [clave, valor]);

    return [valor, setValor];
}