import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateHabitDefinitionInput = {
  is_shared: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CreateHabitInstanceInput = {
  goal: HabitGoalInput;
  habitDefinitionId: Scalars['String']['input'];
};

export type GeneralResponse = {
  __typename?: 'GeneralResponse';
  message: Scalars['String']['output'];
};

export type HabitDefinition = {
  __typename?: 'HabitDefinition';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type HabitGoal = {
  __typename?: 'HabitGoal';
  count: Scalars['Int']['output'];
  reminder?: Maybe<Scalars['String']['output']>;
  repeat: HabitRepeat;
};

export type HabitGoalInput = {
  count: Scalars['Int']['input'];
  reminder?: InputMaybe<Scalars['String']['input']>;
  repeat: HabitRepeatInput;
};

export type HabitInstance = {
  __typename?: 'HabitInstance';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  goal: HabitGoal;
  habitDefinitionId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type HabitRepeat = {
  __typename?: 'HabitRepeat';
  every: Scalars['Int']['output'];
  interval: RepeatInterval;
  on?: Maybe<Array<Maybe<RepeatOn>>>;
};

export type HabitRepeatInput = {
  every: Scalars['Int']['input'];
  interval: RepeatInterval;
  on?: InputMaybe<Array<InputMaybe<RepeatOn>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createHabitDefinition?: Maybe<HabitDefinition>;
  createHabitInstance?: Maybe<GeneralResponse>;
};


export type MutationCreateHabitDefinitionArgs = {
  createHabitDefinitionInput?: InputMaybe<CreateHabitDefinitionInput>;
};


export type MutationCreateHabitInstanceArgs = {
  createHabitInstanceInput?: InputMaybe<CreateHabitInstanceInput>;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export enum RepeatInterval {
  Day = 'day',
  Month = 'month',
  Week = 'week',
  Year = 'year'
}

export enum RepeatOn {
  Fri = 'Fri',
  Mon = 'Mon',
  Sat = 'Sat',
  Sun = 'Sun',
  Thu = 'Thu',
  Tue = 'Tue',
  Wed = 'Wed'
}

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateHabitDefinitionInput: CreateHabitDefinitionInput;
  CreateHabitInstanceInput: CreateHabitInstanceInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  GeneralResponse: ResolverTypeWrapper<GeneralResponse>;
  HabitDefinition: ResolverTypeWrapper<HabitDefinition>;
  HabitGoal: ResolverTypeWrapper<HabitGoal>;
  HabitGoalInput: HabitGoalInput;
  HabitInstance: ResolverTypeWrapper<HabitInstance>;
  HabitRepeat: ResolverTypeWrapper<HabitRepeat>;
  HabitRepeatInput: HabitRepeatInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RepeatInterval: RepeatInterval;
  RepeatOn: RepeatOn;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateHabitDefinitionInput: CreateHabitDefinitionInput;
  CreateHabitInstanceInput: CreateHabitInstanceInput;
  DateTime: Scalars['DateTime']['output'];
  GeneralResponse: GeneralResponse;
  HabitDefinition: HabitDefinition;
  HabitGoal: HabitGoal;
  HabitGoalInput: HabitGoalInput;
  HabitInstance: HabitInstance;
  HabitRepeat: HabitRepeat;
  HabitRepeatInput: HabitRepeatInput;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  User: User;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GeneralResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralResponse'] = ResolversParentTypes['GeneralResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HabitDefinitionResolvers<ContextType = any, ParentType extends ResolversParentTypes['HabitDefinition'] = ResolversParentTypes['HabitDefinition']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HabitGoalResolvers<ContextType = any, ParentType extends ResolversParentTypes['HabitGoal'] = ResolversParentTypes['HabitGoal']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reminder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  repeat?: Resolver<ResolversTypes['HabitRepeat'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HabitInstanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['HabitInstance'] = ResolversParentTypes['HabitInstance']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  goal?: Resolver<ResolversTypes['HabitGoal'], ParentType, ContextType>;
  habitDefinitionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HabitRepeatResolvers<ContextType = any, ParentType extends ResolversParentTypes['HabitRepeat'] = ResolversParentTypes['HabitRepeat']> = {
  every?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  interval?: Resolver<ResolversTypes['RepeatInterval'], ParentType, ContextType>;
  on?: Resolver<Maybe<Array<Maybe<ResolversTypes['RepeatOn']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createHabitDefinition?: Resolver<Maybe<ResolversTypes['HabitDefinition']>, ParentType, ContextType, Partial<MutationCreateHabitDefinitionArgs>>;
  createHabitInstance?: Resolver<Maybe<ResolversTypes['GeneralResponse']>, ParentType, ContextType, Partial<MutationCreateHabitInstanceArgs>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  GeneralResponse?: GeneralResponseResolvers<ContextType>;
  HabitDefinition?: HabitDefinitionResolvers<ContextType>;
  HabitGoal?: HabitGoalResolvers<ContextType>;
  HabitInstance?: HabitInstanceResolvers<ContextType>;
  HabitRepeat?: HabitRepeatResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

