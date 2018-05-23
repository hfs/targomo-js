import { MultigraphInfo } from './../types/responses/multigraphInfo';
import { LatLngIdTravelMode, LatLngId, MultigraphRequestAggregation } from './../types';
import { TargomoClient } from './targomoClient';
import { StatisticsSet } from '../index'

describe('Multigraph', () => {
  const testClient = new TargomoClient(
    'https://dev.route360.net/tests/',
    'uhWrWpUhyZQy8rPfiC7X',
    {statisticsUrl: 'https://dev.route360.net/statistics/'
  })

  test('create new mg layer', async () => {
    const sources = [
      { lng: 13.3786431, lat: 52.4668237, id: 1 },
      { lng: 13.3569313, lat: 52.533013, id: 2 },
      { lng: 13.3799274, lat: 52.51644311, id: 3 }
    ]
    try {
      const result = await testClient.multigraph.create(sources, {
        maxEdgeWeight: 3600,
        travelType: 'car',
        aggregation: {
          type: MultigraphRequestAggregation.MEDIAN,
          ignoreOutliers: true,
          minSourcesRatio: 0.5
        }
      })
      expect(typeof result).toBe('number')
    } catch (e) {
      console.log('multigraph error', e)
      expect(e).not.toBeDefined()
    }
  })

  test('get info for layer 42', async () => {
    try {
      const result = await testClient.multigraph.info(42)
      expect(result.amountSources).toBeDefined()
      expect(result.status).toBeDefined()
      expect(result.routingProgress).toBeDefined()
    } catch (e) {
      console.log('multigraph error', e)
      expect(e).not.toBeDefined()
    }
  })
})
