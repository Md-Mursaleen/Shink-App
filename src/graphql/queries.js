/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getShinkUser = /* GraphQL */ `
  query GetShinkUser($userId: String!) {
    getShinkUser(userId: $userId) {
      bio
      birthDate
      datePreference
      datePreferenceAgeMax
      datePreferenceAgeMin
      datePreferenceGender
      datePreferenceOrientation
      dislikes
      gender
      givenGreenFlags
      givenRedFlags
      images
      interests
      isAgreementCompleted
      isVerified
      leftSwipes
      likes
      location
      matches
      name
      phoneNumber
      receivedGreenFlags
      receivedRedFlags
      relationshipStatus
      reports
      rightSwipes
      sexuality
      socketInfo
      spotifyMusicInterests
      subscriptionInfo
      userId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listShinkUsers = /* GraphQL */ `
  query ListShinkUsers(
    $userId: String
    $filter: ModelShinkUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listShinkUsers(
      userId: $userId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        bio
        birthDate
        datePreference
        datePreferenceAgeMax
        datePreferenceAgeMin
        datePreferenceGender
        datePreferenceOrientation
        dislikes
        gender
        givenGreenFlags
        givenRedFlags
        images
        interests
        isAgreementCompleted
        isVerified
        leftSwipes
        likes
        location
        matches
        name
        phoneNumber
        receivedGreenFlags
        receivedRedFlags
        relationshipStatus
        reports
        rightSwipes
        sexuality
        socketInfo
        spotifyMusicInterests
        subscriptionInfo
        userId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncShinkUsers = /* GraphQL */ `
  query SyncShinkUsers(
    $filter: ModelShinkUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncShinkUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        bio
        birthDate
        datePreference
        datePreferenceAgeMax
        datePreferenceAgeMin
        datePreferenceGender
        datePreferenceOrientation
        dislikes
        gender
        givenGreenFlags
        givenRedFlags
        images
        interests
        isAgreementCompleted
        isVerified
        leftSwipes
        likes
        location
        matches
        name
        phoneNumber
        receivedGreenFlags
        receivedRedFlags
        relationshipStatus
        reports
        rightSwipes
        sexuality
        socketInfo
        spotifyMusicInterests
        subscriptionInfo
        userId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getUserMessages = /* GraphQL */ `
  query GetUserMessages($id: String!) {
    getUserMessages(id: $id) {
      createdAt
      from
      id
      message
      to
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listUserMessages = /* GraphQL */ `
  query ListUserMessages(
    $id: String
    $filter: ModelUserMessagesFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserMessages(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        from
        id
        message
        to
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUserMessages = /* GraphQL */ `
  query SyncUserMessages(
    $filter: ModelUserMessagesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserMessages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        createdAt
        from
        id
        message
        to
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
