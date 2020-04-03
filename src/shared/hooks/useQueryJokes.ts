import { useMemo } from 'react';
import { useQuery } from 'react-query';
import fetchWithRetries from 'shared/helpers/fetchWithRetries';
import filteredData from 'shared/helpers/filteredData';

/**
 * This hooks can be used to get the jokes from Chuck Norris API
 * There are the jokes result, that we can call them as normal jokes
 * and random joke
 *
 * @param string
 * @param object
 */
export default function useQueryJokes(query, { isFeelingLucky }) {
  const fetchJokes = (string, arg) => {
    return fetchWithRetries(
      `https://api.chucknorris.io/jokes/search?query=${arg}`
    ).then(res => res.json());
  };

  const fetchRandomJoke = () => {
    return fetchWithRetries(
      'https://api.chucknorris.io/jokes/random'
    ).then(res => res.json());
  };

  const { data, status } = useQuery(query && ['jokes', query], fetchJokes);
  const { data: randomJoke, status: randomStatus } = useQuery(
    'randomJoke',
    fetchRandomJoke
  );

  const results = useMemo(
    () => filteredData(data, randomJoke, isFeelingLucky),
    [data, randomJoke, isFeelingLucky]
  );

  const loadingStatus = { normal: status, random: randomStatus };

  return [results, loadingStatus];
}
