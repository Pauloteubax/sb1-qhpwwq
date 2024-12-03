import { AxiosError } from 'axios';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public isRetryable: boolean = false
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: AxiosError): never {
  if (!error.response) {
    throw new ApiError(
      'Erreur de connexion. Veuillez vérifier votre connexion internet.',
      undefined,
      true
    );
  }

  const statusCode = error.response.status;
  let message: string;

  switch (statusCode) {
    case 401:
      message = 'Erreur d\'authentification. Veuillez vérifier votre clé API.';
      break;
    case 403:
      message = 'Accès refusé. Veuillez vérifier vos droits d\'accès.';
      break;
    case 404:
      message = 'Données non trouvées.';
      break;
    case 429:
      message = 'Limite de requêtes atteinte. Veuillez réessayer plus tard.';
      break;
    case 500:
      message = 'Erreur serveur. Veuillez réessayer plus tard.';
      break;
    default:
      message = 'Une erreur est survenue lors de la récupération des données.';
  }

  throw new ApiError(
    message,
    statusCode,
    statusCode >= 500 || statusCode === 429
  );
}