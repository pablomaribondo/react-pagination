/* eslint-disable camelcase */
interface Country {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  phone_code: string;
  capital: string;
  currency: string;
  native: string | null;
  emoji: string | null;
  emojiU: string | null;
  [key: string]: string;
}

interface CountriesData {
  itemsPerPage: number;
  startFrom?: number;
  data: Country[];
  searchByData?: { [key: string]: string }[];
}

interface PaginationLink {
  id: number;
  current: boolean;
  ellipsis: boolean;
}
