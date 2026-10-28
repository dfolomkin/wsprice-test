export const API = {
  getPrices: 'http://api.favorit-parts.ru/hs/hsprice/',
}

export const USER_ID = '00000000-0000-0000-0000-000000000001'
export const EMPTY_RESPONSE_USER_ID = '00000000-0000-0000-0000-000000000000'

export const FETCH_STATUS_BASE = {
  uninitialized: 'uninitialized',
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
}

export const FETCH_STATUS = FETCH_STATUS_BASE as Record<
  keyof typeof FETCH_STATUS_BASE,
  keyof typeof FETCH_STATUS_BASE
>

export const ERROR_LOCALE = {
  'Empty key!': 'Не указан ключ покупателя',
  'Invalid key client!': 'Неверный ключ покупателя, покупатель не найден',
  'Empty number goods!': 'Не указан номер детали',
  'Request quota exceeded!':
    'Вы превысили лимит запросов по грузовому ассортименту (у нас для каждого клиента есть ограничения на поиск грузовых запчастей)',
  'Error: Wrong response structure!':
    'Неправильная структура ответа / Отсутствуют аналоги',
  'Error: Not found!': 'Запчасть не найдена',
}
