import axios from 'axios';
import * as cheerio from 'cheerio';
import NodeCache from 'node-cache';
import { ConstructorStanding } from '../types/f1';

const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

const F1_URL = 'https://www.formula1.com/en/results.html/2024/team.html';

interface ScrapedConstructor {
  position: string;
  points: string;
  name: string;
  nationality: string;
}

async function fetchF1Page(url: string): Promise<string> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching F1 page:', error);
    throw new Error('Failed to fetch F1 data');
  }
}

function parseConstructorData($: cheerio.CheerioAPI): ScrapedConstructor[] {
  const constructors: ScrapedConstructor[] = [];
  
  $('.resultsarchive-table tbody tr').each((_, element) => {
    const position = $(element).find('td:nth-child(2)').text().trim();
    const name = $(element).find('td:nth-child(3)').text().trim();
    const points = $(element).find('td:nth-child(4)').text().trim();
    const nationality = $(element).find('td:nth-child(3) img').attr('alt') || 'Unknown';

    constructors.push({
      position,
      points,
      name,
      nationality
    });
  });

  return constructors;
}

function normalizeConstructorId(name: string): string {
  const mapping: Record<string, string> = {
    'Red Bull Racing': 'red_bull',
    'Ferrari': 'ferrari',
    'Mercedes': 'mercedes',
    'McLaren': 'mclaren',
    'Aston Martin': 'aston_martin',
    'Alpine F1 Team': 'alpine',
    'Visa Cash App RB': 'visa_cash_app_rb',
    'Williams': 'williams',
    'Haas F1 Team': 'haas',
    'Stake F1 Team': 'sauber'
  };

  return mapping[name] || name.toLowerCase().replace(/\s+/g, '_');
}

export async function scrapeConstructorStandings(): Promise<ConstructorStanding[]> {
  const cacheKey = 'constructor_standings';
  const cachedData = cache.get<ConstructorStanding[]>(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const html = await fetchF1Page(F1_URL);
    const $ = cheerio.load(html);
    const scrapedData = parseConstructorData($);

    const standings: ConstructorStanding[] = scrapedData.map(item => ({
      position: item.position,
      points: item.points,
      Constructor: {
        constructorId: normalizeConstructorId(item.name),
        name: item.name,
        nationality: item.nationality.toLowerCase()
      }
    }));

    cache.set(cacheKey, standings);
    return standings;
  } catch (error) {
    console.error('Error scraping constructor standings:', error);
    throw error;
  }
}