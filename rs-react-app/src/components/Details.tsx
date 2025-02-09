import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface DetailsProps {
  onClose: () => void;
}

const Details: React.FC<DetailsProps> = ({ onClose }) => {
  const { id } = useParams<{ id?: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <div className="details">
      <button onClick={onClose}>Закрыть</button>
      {loading ? <p>Загрузка...</p> : (
        data && (
          <div>
            <h2>{data.name}</h2>
            <img src={data.sprites.front_default} alt={data.name} />
          </div>
        )
      )}
    </div>
  );
};

export default Details;