import { TargomoClient } from './index';
import { LatLngIdTravelMode, LatLngId } from '../index';

describe('TargomoClient route service', () => {
  const testClient = new TargomoClient('germany', process.env.TGM_TEST_API_KEY)

  test('route service request compact', async () => {
    const sources: LatLngIdTravelMode[] = [
      { lat: 52.5330232, lng: 13.356626, id: 1 },
    ]
    const targets: LatLngId[] = [
      { lat: 52.510801, lng: 13.401207, id: 10 },
      { lat: 52.517066, lng: 13.408370, id: 11 }
    ]
    const result = await testClient.routes.fetch(sources, targets, {
      travelType: 'car',
      maxEdgeWeight: 1800,
      useClientCache: false,
      pathSerializer: 'compact'
    })
    expect(result[0]).toBeDefined();
    expect(result[0].points.length).toBeGreaterThan(0)
  })

  test('route service request geojson', async () => {
    const sources: LatLngIdTravelMode[] = [
      { lat: 52.5330232, lng: 13.356626, id: 1 },
    ]
    const targets: LatLngId[] = [
      { lat: 52.510801, lng: 13.401207, id: 10 },
      { lat: 52.517066, lng: 13.408370, id: 11 }
    ]
    const result = await testClient.routes.fetch(sources, targets, {
      travelType: 'car',
      maxEdgeWeight: 1800,
      useClientCache: false,
      pathSerializer: 'geojson'
    })

    expect(result[0]).toBeDefined()
    expect(result[0].type).toEqual('FeatureCollection');
  })
})
