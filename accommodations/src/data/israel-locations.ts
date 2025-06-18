export enum IsraeliRegion {
  JERUSALEM = 'Jerusalem',
  NORTHERN = 'Northern', 
  HAIFA = 'Haifa',
  CENTRAL = 'Central',
  TEL_AVIV = 'Tel Aviv',
  SOUTHERN = 'Southern'
}

export interface IsraeliCity {
  name: string;
  region: IsraeliRegion;
}

export const ISRAELI_CITIES: IsraeliCity[] = [
  { name: 'Jerusalem', region: IsraeliRegion.JERUSALEM },
  { name: 'Ma\'ale Adumim', region: IsraeliRegion.JERUSALEM },
  { name: 'Beitar Illit', region: IsraeliRegion.JERUSALEM },
  { name: 'Givat Ze\'ev', region: IsraeliRegion.JERUSALEM },
  
  { name: 'Nazareth', region: IsraeliRegion.NORTHERN },
  { name: 'Acre', region: IsraeliRegion.NORTHERN },
  { name: 'Safed', region: IsraeliRegion.NORTHERN },
  { name: 'Tiberias', region: IsraeliRegion.NORTHERN },
  { name: 'Nahariya', region: IsraeliRegion.NORTHERN },
  { name: 'Carmiel', region: IsraeliRegion.NORTHERN },
  { name: 'Kiryat Shmona', region: IsraeliRegion.NORTHERN },
  
  { name: 'Haifa', region: IsraeliRegion.HAIFA },
  { name: 'Hadera', region: IsraeliRegion.HAIFA },
  { name: 'Nesher', region: IsraeliRegion.HAIFA },
  { name: 'Tirat Carmel', region: IsraeliRegion.HAIFA },
  { name: 'Kiryat Ata', region: IsraeliRegion.HAIFA },
  { name: 'Kiryat Bialik', region: IsraeliRegion.HAIFA },
  
  { name: 'Rishon LeZion', region: IsraeliRegion.CENTRAL },
  { name: 'Petah Tikva', region: IsraeliRegion.CENTRAL },
  { name: 'Netanya', region: IsraeliRegion.CENTRAL },
  { name: 'Rehovot', region: IsraeliRegion.CENTRAL },
  { name: 'Kfar Saba', region: IsraeliRegion.CENTRAL },
  { name: 'Hod HaSharon', region: IsraeliRegion.CENTRAL },
  { name: 'Ra\'anana', region: IsraeliRegion.CENTRAL },
  { name: 'Herzliya', region: IsraeliRegion.CENTRAL },
  { name: 'Modi\'in-Maccabim-Re\'ut', region: IsraeliRegion.CENTRAL },
  { name: 'Lod', region: IsraeliRegion.CENTRAL },
  { name: 'Ramla', region: IsraeliRegion.CENTRAL },
  { name: 'Rosh HaAyin', region: IsraeliRegion.CENTRAL },
  
  { name: 'Tel Aviv-Yafo', region: IsraeliRegion.TEL_AVIV },
  { name: 'Holon', region: IsraeliRegion.TEL_AVIV },
  { name: 'Bat Yam', region: IsraeliRegion.TEL_AVIV },
  { name: 'Bnei Brak', region: IsraeliRegion.TEL_AVIV },
  { name: 'Ramat Gan', region: IsraeliRegion.TEL_AVIV },
  { name: 'Givatayim', region: IsraeliRegion.TEL_AVIV },
  
  { name: 'Beer Sheva', region: IsraeliRegion.SOUTHERN },
  { name: 'Ashdod', region: IsraeliRegion.SOUTHERN },
  { name: 'Ashkelon', region: IsraeliRegion.SOUTHERN },
  { name: 'Eilat', region: IsraeliRegion.SOUTHERN },
  { name: 'Kiryat Gat', region: IsraeliRegion.SOUTHERN },
  { name: 'Netivot', region: IsraeliRegion.SOUTHERN },
  { name: 'Sderot', region: IsraeliRegion.SOUTHERN },
  { name: 'Dimona', region: IsraeliRegion.SOUTHERN },
  { name: 'Arad', region: IsraeliRegion.SOUTHERN },
  { name: 'Kiryat Malakhi', region: IsraeliRegion.SOUTHERN }
];

export const LocationUtils = {
  getRegions(): string[] {
    return Object.values(IsraeliRegion);
  },
  
  getCitiesByRegion(region: string): string[] {
    return ISRAELI_CITIES
      .filter(city => city.region === region)
      .map(city => city.name)
      .sort();
  },
  
  searchCities(searchTerm: string): string[] {
    const term = searchTerm.toLowerCase();
    return ISRAELI_CITIES
      .filter(city => 
        city.name.toLowerCase().includes(term) ||
        city.region.toLowerCase().includes(term)
      )
      .map(city => city.name)
      .slice(0, 10);
  },
  
  validateLocation(region: string, city: string): boolean {
    return ISRAELI_CITIES.some(c => 
      c.region === region && 
      c.name.toLowerCase() === city.toLowerCase()
    );
  },
  
  getCityInfo(cityName: string): IsraeliCity | null {
    return ISRAELI_CITIES.find(city => 
      city.name.toLowerCase() === cityName.toLowerCase()
    ) || null;
  }
};