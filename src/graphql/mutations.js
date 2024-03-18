/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createShinkUser = /* GraphQL */ `
  mutation CreateShinkUser(
    $input: CreateShinkUserInput!
    $condition: ModelShinkUserConditionInput
  ) {
    createShinkUser(input: $input, condition: $condition) {
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
export const updateShinkUser = /* GraphQL */ `
  mutation UpdateShinkUser(
    $input: UpdateShinkUserInput!
    $condition: ModelShinkUserConditionInput
  ) {
    updateShinkUser(input: $input, condition: $condition) {
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
export const deleteShinkUser = /* GraphQL */ `
  mutation DeleteShinkUser(
    $input: DeleteShinkUserInput!
    $condition: ModelShinkUserConditionInput
  ) {
    deleteShinkUser(input: $input, condition: $condition) {
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
export const createUserMessages = /* GraphQL */ `
  mutation CreateUserMessages(
    $input: CreateUserMessagesInput!
    $condition: ModelUserMessagesConditionInput
  ) {
    createUserMessages(input: $input, condition: $condition) {
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
export const updateUserMessages = /* GraphQL */ `
  mutation UpdateUserMessages(
    $input: UpdateUserMessagesInput!
    $condition: ModelUserMessagesConditionInput
  ) {
    updateUserMessages(input: $input, condition: $condition) {
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
export const deleteUserMessages = /* GraphQL */ `
  mutation DeleteUserMessages(
    $input: DeleteUserMessagesInput!
    $condition: ModelUserMessagesConditionInput
  ) {
    deleteUserMessages(input: $input, condition: $condition) {
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
