// eslint-disable
// this is an auto generated file. This will be overwritten

export const getFeature = `query GetFeature($id: ID!) {
  getFeature(id: $id) {
    id
    value
    type
  }
}
`;
export const listFeatures = `query ListFeatures(
  $filter: ModelFeatureFilterInput
  $limit: Int
  $nextToken: String
) {
  listFeatures(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      value
      type
    }
    nextToken
  }
}
`;
export const getSetting = `query GetSetting($id: ID!) {
  getSetting(id: $id) {
    id
    value
    type
  }
}
`;
export const listSettings = `query ListSettings(
  $filter: ModelSettingFilterInput
  $limit: Int
  $nextToken: String
) {
  listSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      value
      type
    }
    nextToken
  }
}
`;
export const searchFeatures = `query SearchFeatures(
  $filter: SearchableFeatureFilterInput
  $sort: SearchableFeatureSortInput
  $limit: Int
  $nextToken: Int
) {
  searchFeatures(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      value
      type
    }
    nextToken
  }
}
`;
