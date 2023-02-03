/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBusiness = /* GraphQL */ `
  subscription OnCreateBusiness(
    $filter: ModelSubscriptionBusinessFilterInput
    $owner: String
  ) {
    onCreateBusiness(filter: $filter, owner: $owner) {
      id
      name
      about
      phone
      address
      image
      website
      multiposts {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateBusiness = /* GraphQL */ `
  subscription OnUpdateBusiness(
    $filter: ModelSubscriptionBusinessFilterInput
    $owner: String
  ) {
    onUpdateBusiness(filter: $filter, owner: $owner) {
      id
      name
      about
      phone
      address
      image
      website
      multiposts {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteBusiness = /* GraphQL */ `
  subscription OnDeleteBusiness(
    $filter: ModelSubscriptionBusinessFilterInput
    $owner: String
  ) {
    onDeleteBusiness(filter: $filter, owner: $owner) {
      id
      name
      about
      phone
      address
      image
      website
      multiposts {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateMultiposts = /* GraphQL */ `
  subscription OnCreateMultiposts(
    $filter: ModelSubscriptionMultipostsFilterInput
    $owner: String
  ) {
    onCreateMultiposts(filter: $filter, owner: $owner) {
      id
      title
      fb_id
      inst_id
      twit_id
      createdAt
      updatedAt
      businessMultipostsId
      owner
    }
  }
`;
export const onUpdateMultiposts = /* GraphQL */ `
  subscription OnUpdateMultiposts(
    $filter: ModelSubscriptionMultipostsFilterInput
    $owner: String
  ) {
    onUpdateMultiposts(filter: $filter, owner: $owner) {
      id
      title
      fb_id
      inst_id
      twit_id
      createdAt
      updatedAt
      businessMultipostsId
      owner
    }
  }
`;
export const onDeleteMultiposts = /* GraphQL */ `
  subscription OnDeleteMultiposts(
    $filter: ModelSubscriptionMultipostsFilterInput
    $owner: String
  ) {
    onDeleteMultiposts(filter: $filter, owner: $owner) {
      id
      title
      fb_id
      inst_id
      twit_id
      createdAt
      updatedAt
      businessMultipostsId
      owner
    }
  }
`;
