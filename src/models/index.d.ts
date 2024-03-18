import { ModelInit, MutableModel, __modelMeta__, CustomIdentifier, OptionallyManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerShinkUser = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<ShinkUser, 'userId'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly bio?: string | null;
  readonly birthDate?: string | null;
  readonly datePreference?: string | null;
  readonly datePreferenceAgeMax?: number | null;
  readonly datePreferenceAgeMin?: number | null;
  readonly datePreferenceGender?: string | null;
  readonly datePreferenceOrientation?: string | null;
  readonly dislikes?: (string | null)[] | null;
  readonly gender?: string | null;
  readonly givenGreenFlags?: (string | null)[] | null;
  readonly givenRedFlags?: (string | null)[] | null;
  readonly images?: (string | null)[] | null;
  readonly interests?: (string | null)[] | null;
  readonly isAgreementCompleted?: boolean | null;
  readonly isVerified?: boolean | null;
  readonly leftSwipes?: (string | null)[] | null;
  readonly likes?: (string | null)[] | null;
  readonly location?: string | null;
  readonly matches?: (string | null)[] | null;
  readonly name?: string | null;
  readonly phoneNumber?: string | null;
  readonly receivedGreenFlags?: (string | null)[] | null;
  readonly receivedRedFlags?: (string | null)[] | null;
  readonly relationshipStatus?: string | null;
  readonly reports?: (string | null)[] | null;
  readonly rightSwipes?: (string | null)[] | null;
  readonly sexuality?: string | null;
  readonly socketInfo?: string | null;
  readonly spotifyMusicInterests?: string | null;
  readonly subscriptionInfo?: string | null;
  readonly userId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyShinkUser = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<ShinkUser, 'userId'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly bio?: string | null;
  readonly birthDate?: string | null;
  readonly datePreference?: string | null;
  readonly datePreferenceAgeMax?: number | null;
  readonly datePreferenceAgeMin?: number | null;
  readonly datePreferenceGender?: string | null;
  readonly datePreferenceOrientation?: string | null;
  readonly dislikes?: (string | null)[] | null;
  readonly gender?: string | null;
  readonly givenGreenFlags?: (string | null)[] | null;
  readonly givenRedFlags?: (string | null)[] | null;
  readonly images?: (string | null)[] | null;
  readonly interests?: (string | null)[] | null;
  readonly isAgreementCompleted?: boolean | null;
  readonly isVerified?: boolean | null;
  readonly leftSwipes?: (string | null)[] | null;
  readonly likes?: (string | null)[] | null;
  readonly location?: string | null;
  readonly matches?: (string | null)[] | null;
  readonly name?: string | null;
  readonly phoneNumber?: string | null;
  readonly receivedGreenFlags?: (string | null)[] | null;
  readonly receivedRedFlags?: (string | null)[] | null;
  readonly relationshipStatus?: string | null;
  readonly reports?: (string | null)[] | null;
  readonly rightSwipes?: (string | null)[] | null;
  readonly sexuality?: string | null;
  readonly socketInfo?: string | null;
  readonly spotifyMusicInterests?: string | null;
  readonly subscriptionInfo?: string | null;
  readonly userId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ShinkUser = LazyLoading extends LazyLoadingDisabled ? EagerShinkUser : LazyShinkUser

export declare const ShinkUser: (new (init: ModelInit<ShinkUser>) => ShinkUser) & {
  copyOf(source: ShinkUser, mutator: (draft: MutableModel<ShinkUser>) => MutableModel<ShinkUser> | void): ShinkUser;
}

type EagerUserMessages = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<UserMessages, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly createdAt?: number | null;
  readonly from?: string | null;
  readonly message?: (string | null)[] | null;
  readonly to?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserMessages = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<UserMessages, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly createdAt?: number | null;
  readonly from?: string | null;
  readonly message?: (string | null)[] | null;
  readonly to?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserMessages = LazyLoading extends LazyLoadingDisabled ? EagerUserMessages : LazyUserMessages

export declare const UserMessages: (new (init: ModelInit<UserMessages>) => UserMessages) & {
  copyOf(source: UserMessages, mutator: (draft: MutableModel<UserMessages>) => MutableModel<UserMessages> | void): UserMessages;
}