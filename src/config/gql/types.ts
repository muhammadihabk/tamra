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

export type CreateHabitLogInput = {
  count: Scalars['Int']['input'];
  date?: InputMaybe<Scalars['DateTime']['input']>;
  habitInstanceId: Scalars['String']['input'];
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

export type HabitLog = {
  __typename?: 'HabitLog';
  _id: Scalars['String']['output'];
  count: Scalars['Int']['output'];
  date: Scalars['DateTime']['output'];
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

export type HabitStats = {
  __typename?: 'HabitStats';
  score: Scalars['Float']['output'];
  streak: Scalars['Int']['output'];
  totalCount: Scalars['Float']['output'];
};

export type HabitsByUserIdResponse = {
  __typename?: 'HabitsByUserIdResponse';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  goal: HabitGoal;
  habitDefinition?: Maybe<HabitDefinition>;
  habitDefinitionId: Scalars['String']['output'];
  logs?: Maybe<Array<Maybe<HabitLog>>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createHabitDefinition?: Maybe<HabitDefinition>;
  createHabitInstance?: Maybe<GeneralResponse>;
  createHabitLog?: Maybe<GeneralResponse>;
};


export type MutationCreateHabitDefinitionArgs = {
  createHabitDefinitionInput?: InputMaybe<CreateHabitDefinitionInput>;
};


export type MutationCreateHabitInstanceArgs = {
  createHabitInstanceInput?: InputMaybe<CreateHabitInstanceInput>;
};


export type MutationCreateHabitLogArgs = {
  createHabitLogInput?: InputMaybe<CreateHabitLogInput>;
};

export type Query = {
  __typename?: 'Query';
  habitStats?: Maybe<HabitStats>;
  habitsByUserId?: Maybe<Array<Maybe<HabitsByUserIdResponse>>>;
  me?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};


export type QueryHabitStatsArgs = {
  id: Scalars['String']['input'];
};


export type QueryHabitsByUserIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export enum RepeatInterval {
  Day = 'day',
  Month = 'month',
  Week = 'week'
}

export enum RepeatOn {
  Day_1 = 'Day_1',
  Day_2 = 'Day_2',
  Day_3 = 'Day_3',
  Day_4 = 'Day_4',
  Day_5 = 'Day_5',
  Day_6 = 'Day_6',
  Day_7 = 'Day_7',
  Day_8 = 'Day_8',
  Day_9 = 'Day_9',
  Day_10 = 'Day_10',
  Day_11 = 'Day_11',
  Day_12 = 'Day_12',
  Day_13 = 'Day_13',
  Day_14 = 'Day_14',
  Day_15 = 'Day_15',
  Day_16 = 'Day_16',
  Day_17 = 'Day_17',
  Day_18 = 'Day_18',
  Day_19 = 'Day_19',
  Day_20 = 'Day_20',
  Day_21 = 'Day_21',
  Day_22 = 'Day_22',
  Day_23 = 'Day_23',
  Day_24 = 'Day_24',
  Day_25 = 'Day_25',
  Day_26 = 'Day_26',
  Day_27 = 'Day_27',
  Day_28 = 'Day_28',
  Day_29 = 'Day_29',
  Day_30 = 'Day_30',
  Day_31 = 'Day_31',
  FirstFri = 'First_Fri',
  FirstMon = 'First_Mon',
  FirstSat = 'First_Sat',
  FirstSun = 'First_Sun',
  FirstThu = 'First_Thu',
  FirstTue = 'First_Tue',
  FirstWed = 'First_Wed',
  FourthFri = 'Fourth_Fri',
  FourthMon = 'Fourth_Mon',
  FourthSat = 'Fourth_Sat',
  FourthSun = 'Fourth_Sun',
  FourthThu = 'Fourth_Thu',
  FourthTue = 'Fourth_Tue',
  FourthWed = 'Fourth_Wed',
  Fri = 'Fri',
  LastDay = 'Last_Day',
  LastFri = 'Last_Fri',
  LastMon = 'Last_Mon',
  LastSat = 'Last_Sat',
  LastSun = 'Last_Sun',
  LastThu = 'Last_Thu',
  LastTue = 'Last_Tue',
  LastWed = 'Last_Wed',
  Mon = 'Mon',
  Sat = 'Sat',
  SecondFri = 'Second_Fri',
  SecondMon = 'Second_Mon',
  SecondSat = 'Second_Sat',
  SecondSun = 'Second_Sun',
  SecondThu = 'Second_Thu',
  SecondTue = 'Second_Tue',
  SecondWed = 'Second_Wed',
  Sun = 'Sun',
  ThirdFri = 'Third_Fri',
  ThirdMon = 'Third_Mon',
  ThirdSat = 'Third_Sat',
  ThirdSun = 'Third_Sun',
  ThirdThu = 'Third_Thu',
  ThirdTue = 'Third_Tue',
  ThirdWed = 'Third_Wed',
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
  CreateHabitLogInput: CreateHabitLogInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GeneralResponse: ResolverTypeWrapper<GeneralResponse>;
  HabitDefinition: ResolverTypeWrapper<HabitDefinition>;
  HabitGoal: ResolverTypeWrapper<HabitGoal>;
  HabitGoalInput: HabitGoalInput;
  HabitInstance: ResolverTypeWrapper<HabitInstance>;
  HabitLog: ResolverTypeWrapper<HabitLog>;
  HabitRepeat: ResolverTypeWrapper<HabitRepeat>;
  HabitRepeatInput: HabitRepeatInput;
  HabitStats: ResolverTypeWrapper<HabitStats>;
  HabitsByUserIdResponse: ResolverTypeWrapper<HabitsByUserIdResponse>;
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
  CreateHabitLogInput: CreateHabitLogInput;
  DateTime: Scalars['DateTime']['output'];
  Float: Scalars['Float']['output'];
  GeneralResponse: GeneralResponse;
  HabitDefinition: HabitDefinition;
  HabitGoal: HabitGoal;
  HabitGoalInput: HabitGoalInput;
  HabitInstance: HabitInstance;
  HabitLog: HabitLog;
  HabitRepeat: HabitRepeat;
  HabitRepeatInput: HabitRepeatInput;
  HabitStats: HabitStats;
  HabitsByUserIdResponse: HabitsByUserIdResponse;
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

export type HabitLogResolvers<ContextType = any, ParentType extends ResolversParentTypes['HabitLog'] = ResolversParentTypes['HabitLog']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HabitRepeatResolvers<ContextType = any, ParentType extends ResolversParentTypes['HabitRepeat'] = ResolversParentTypes['HabitRepeat']> = {
  every?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  interval?: Resolver<ResolversTypes['RepeatInterval'], ParentType, ContextType>;
  on?: Resolver<Maybe<Array<Maybe<ResolversTypes['RepeatOn']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HabitStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['HabitStats'] = ResolversParentTypes['HabitStats']> = {
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  streak?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HabitsByUserIdResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['HabitsByUserIdResponse'] = ResolversParentTypes['HabitsByUserIdResponse']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  goal?: Resolver<ResolversTypes['HabitGoal'], ParentType, ContextType>;
  habitDefinition?: Resolver<Maybe<ResolversTypes['HabitDefinition']>, ParentType, ContextType>;
  habitDefinitionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logs?: Resolver<Maybe<Array<Maybe<ResolversTypes['HabitLog']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createHabitDefinition?: Resolver<Maybe<ResolversTypes['HabitDefinition']>, ParentType, ContextType, Partial<MutationCreateHabitDefinitionArgs>>;
  createHabitInstance?: Resolver<Maybe<ResolversTypes['GeneralResponse']>, ParentType, ContextType, Partial<MutationCreateHabitInstanceArgs>>;
  createHabitLog?: Resolver<Maybe<ResolversTypes['GeneralResponse']>, ParentType, ContextType, Partial<MutationCreateHabitLogArgs>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  habitStats?: Resolver<Maybe<ResolversTypes['HabitStats']>, ParentType, ContextType, RequireFields<QueryHabitStatsArgs, 'id'>>;
  habitsByUserId?: Resolver<Maybe<Array<Maybe<ResolversTypes['HabitsByUserIdResponse']>>>, ParentType, ContextType, RequireFields<QueryHabitsByUserIdArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  HabitLog?: HabitLogResolvers<ContextType>;
  HabitRepeat?: HabitRepeatResolvers<ContextType>;
  HabitStats?: HabitStatsResolvers<ContextType>;
  HabitsByUserIdResponse?: HabitsByUserIdResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

