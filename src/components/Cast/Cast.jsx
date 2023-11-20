// Modul Cast.jsx 
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCast } from 'consts/searchApi';

const Cast = () => {
  // Destrukturyzacja parametru movieId z obiektu useParams
  const { movieId } = useParams();
  // Użycie hooka useState do utworzenia stanu cast
  const [cast, setCast] = useState([]);

  // Użycie hooka useEffect do pobrania informacji o obsadzie filmu po zamontowaniu komponentu lub zmianie movieId
  useEffect(() => {
    // Funkcja asynchroniczna pobierająca informacje o obsadzie
    const asyncFunc = async () => {
      try {
        // Wywołanie funkcji getCast, która zwraca informacje o obsadzie filmu
        setCast(await getCast(movieId));
      } catch (error) {
        // Obsługa błędu, jeśli wystąpi problem podczas pobierania danych
        console.log(error);
      }
    };
    asyncFunc();
  }, [movieId]); // movieId jest dodane do zależności useEffect, co oznacza, że useEffect będzie ponownie wywołany przy zmianie movieId

  // Renderowanie komponentu Cast
  return (
    <ul>
    {/* Warunek sprawdzający, czy istnieją informacje o obsadzie */}
      {cast.length === 0 ? (
        <li style={{ listStyle: 'none' }}>
          We don't have cast information for this movie
        </li>
      ) : (
        // Mapowanie informacji o obsadzie na elementy listy
        cast.map(el => (
          <li key={el.id}>
          {/* Wyświetlenie zdjęcia aktora/aktorki */}
            <img
              src={`https://image.tmdb.org/t/p/w500${el.profile_path}`}
              width={200}
              alt={el.name}
            />
            {/* Wyświetlenie imienia i nazwiska */}
            <p>{el.name}</p>
            {/* Wyświetlenie roli w filmie */}
            <p>Character: {el.character}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default Cast;