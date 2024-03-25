import { useEffect, useState } from 'react';

const WeaponData = () => {
  const [weaponData, setWeaponData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchArmorInfo = async (page = 1, pageSize = 50) => {
      try {
        const response = await fetch(
          `https://mhw-db.com/weapons?page=${page}&srlimit=${pageSize}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setWeaponData(data);
        setError(null);
        setLoading(false);
        console.log(data)
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchArmorInfo();
  }, []);

  const filterWeaponsByType = (type) => {
    setSelectedType(type);
  };

  const getFilteredWeapons = () => {
    if (!selectedType) {
      return weaponData;
    }
    return weaponData.filter((weapon) => weapon.type === selectedType);
  };

  return (
    <div className="WeaponData">
      <h1>ALL WEAPONS</h1>
      <div className="filter-buttons">
        <button className='filtro' onClick={() => filterWeaponsByType('great-sword')}>Gran Espada</button>
        <button className='filtro' onClick={() => filterWeaponsByType('long-sword')}>Espada Larga</button>
        <button className='filtro' onClick={() => filterWeaponsByType('sword-and-shield')}>Espada y Escudo</button>
        <button className='filtro' onClick={() => filterWeaponsByType('dual-blades')}>Espadas Dobles</button>
        <button className='filtro' onClick={() => filterWeaponsByType('hammer')}>Martillo</button>
        <button className='filtro' onClick={() => filterWeaponsByType('hunting-horn')}>Cornamusa</button>
        <button className='filtro' onClick={() => filterWeaponsByType('lance')}>Lanza</button>
        <button className='filtro' onClick={() => filterWeaponsByType('gunlance')}>Lanza Pistola</button>
        <button className='filtro' onClick={() => filterWeaponsByType('switch-axe')}>Hacha Espada</button>
        <button className='filtro' onClick={() => filterWeaponsByType('charge-blade')}>Hacha Cargada</button>
        <button className='filtro' onClick={() => filterWeaponsByType('insect-glaive')}>Glaive Insecto</button>
        <button className='filtro' onClick={() => filterWeaponsByType('light-bowgun')}>Ballesta Ligera</button>
        <button className='filtro' onClick={() => filterWeaponsByType('heavy-bowgun')}>Balletas Pesada</button>
        <button className='filtro' onClick={() => filterWeaponsByType('bow')}>Arco</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="armor-grid">
        {getFilteredWeapons()?.map((weapon) => (
          <div key={weapon.id} className="armor-piece">
            <h3>{weapon.name}</h3>
            <p>Type: {weapon.type} {weapon.damageType}</p>
            <img src={weapon.assets?.image} alt={weapon.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeaponData;