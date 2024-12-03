import { StandingsResponse } from '../types/f1';

export const MOCK_STANDINGS_2024: StandingsResponse = {
  MRData: {
    StandingsTable: {
      StandingsLists: [{
        ConstructorStandings: [
          {
            position: "1",
            points: "583",
            Constructor: {
              constructorId: "red_bull",
              name: "Red Bull Racing",
              nationality: "austrian"
            }
          },
          {
            position: "2",
            points: "305",
            Constructor: {
              constructorId: "mercedes",
              name: "Mercedes",
              nationality: "german"
            }
          },
          {
            position: "3",
            points: "285",
            Constructor: {
              constructorId: "aston_martin",
              name: "Aston Martin",
              nationality: "british"
            }
          },
          {
            position: "4",
            points: "265",
            Constructor: {
              constructorId: "ferrari",
              name: "Ferrari",
              nationality: "italian"
            }
          },
          {
            position: "5",
            points: "217",
            Constructor: {
              constructorId: "mclaren",
              name: "McLaren",
              nationality: "british"
            }
          },
          {
            position: "6",
            points: "97",
            Constructor: {
              constructorId: "alpine",
              name: "Alpine F1 Team",
              nationality: "french"
            }
          },
          {
            position: "7",
            points: "23",
            Constructor: {
              constructorId: "williams",
              name: "Williams",
              nationality: "british"
            }
          },
          {
            position: "8",
            points: "21",
            Constructor: {
              constructorId: "visa_cash_app_rb",
              name: "Visa Cash App RB",
              nationality: "italian"
            }
          },
          {
            position: "9",
            points: "12",
            Constructor: {
              constructorId: "haas",
              name: "Haas F1 Team",
              nationality: "american"
            }
          },
          {
            position: "10",
            points: "6",
            Constructor: {
              constructorId: "sauber",
              name: "Stake F1 Team",
              nationality: "swiss"
            }
          }
        ]
      }]
    }
  }
};

export const MOCK_STANDINGS_2023 = {
  MRData: {
    StandingsTable: {
      StandingsLists: [{
        ConstructorStandings: [
          {
            position: "1",
            points: "860",
            Constructor: {
              constructorId: "red_bull",
              name: "Red Bull Racing",
              nationality: "austrian"
            }
          },
          {
            position: "2",
            points: "409",
            Constructor: {
              constructorId: "mercedes",
              name: "Mercedes",
              nationality: "german"
            }
          },
          {
            position: "3",
            points: "406",
            Constructor: {
              constructorId: "ferrari",
              name: "Ferrari",
              nationality: "italian"
            }
          },
          {
            position: "4",
            points: "302",
            Constructor: {
              constructorId: "mclaren",
              name: "McLaren",
              nationality: "british"
            }
          },
          {
            position: "5",
            points: "280",
            Constructor: {
              constructorId: "aston_martin",
              name: "Aston Martin",
              nationality: "british"
            }
          },
          {
            position: "6",
            points: "120",
            Constructor: {
              constructorId: "alpine",
              name: "Alpine F1 Team",
              nationality: "french"
            }
          },
          {
            position: "7",
            points: "28",
            Constructor: {
              constructorId: "williams",
              name: "Williams",
              nationality: "british"
            }
          },
          {
            position: "8",
            points: "25",
            Constructor: {
              constructorId: "alphatauri",
              name: "AlphaTauri",
              nationality: "italian"
            }
          },
          {
            position: "9",
            points: "16",
            Constructor: {
              constructorId: "alfa",
              name: "Alfa Romeo",
              nationality: "swiss"
            }
          },
          {
            position: "10",
            points: "12",
            Constructor: {
              constructorId: "haas",
              name: "Haas F1 Team",
              nationality: "american"
            }
          }
        ]
      }]
    }
  }
};

const MOCK_DATA: Record<number, StandingsResponse> = {
  2024: MOCK_STANDINGS_2024,
  2023: MOCK_STANDINGS_2023,
};

export function getMockStandings(season: number): StandingsResponse {
  return MOCK_DATA[season] || MOCK_STANDINGS_2024;
}