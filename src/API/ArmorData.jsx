import { useEffect, useState } from "react";

const ArmorData = () => {
  const [armorData, setArmorData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeArmorId, setActiveArmorId] = useState(null);

  useEffect(() => {
    const fetchArmorInfo = async (page = 1, pageSize = 50) => {
      try {
        const response = await fetch(
          `https://mhw-db.com/armor/sets?page=${page}&srlimit=${pageSize}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setArmorData(data);
        setError(null);
        setLoading(false); // Cambia el estado de carga a falso una vez que se obtienen los datos
        console.log(data);
      } catch (error) {
        setError(error.message);
        setLoading(false); // Cambia el estado de carga a falso si hay un error
      }
    };

    fetchArmorInfo();
  }, []); // Ejecuta fetchArmorInfo solo cuando el componente se monta por primera vez

  const showImage = (armorId) => {
    setActiveArmorId(armorId === activeArmorId ? null : armorId);
  };

  return (
    <div className="Armor">
      <h1> ALL ARMORS SET </h1>
      {loading && <p>Loading...</p>}{" "}
      {/* Muestra un indicador de carga si los datos están cargando */}
      {error && <p>{error}</p>}
      <div className="armor-grid">
        {armorData &&
          armorData.map((armor) => (
            <div key={armor.id} className="armor-piece">
              <h3>{armor.name}</h3>
              <p>Rank: {armor.rank}</p>
              <div className="carrusel">
                {armor.pieces &&
                  armor.pieces.map(
                    (piece) =>
                      piece && (
                        <div
                          key={piece.id}
                          className={`carrusel-item ${
                            armor.id === activeArmorId ? "active" : ""
                          }`}
                        >
                          <h2></h2>
                          <img
                            src={piece.assets?.imageMale}
                            alt={`Armor - ${piece.name}`}
                            width={200}
                            height={200}
                          />
                          <h2></h2>
                          <img
                            src={piece.assets?.imageFemale}
                            alt={`Armor - ${piece.name}`}
                            width={200}
                            height={200}
                          />
                        </div>
                      )
                  )}
              </div>
              <button onClick={() => showImage(armor.id)}> show </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ArmorData;
