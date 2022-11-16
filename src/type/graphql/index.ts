import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  ConfigValue: any
  Date: any
}

export type AppMutation = {
  __typename?: 'AppMutation'
  clipboardWriteText?: Maybe<MutationResult>
  showMessageBox?: Maybe<MutationResult>
}

export type AppMutationClipboardWriteTextArgs = {
  text?: InputMaybe<Scalars['String']>
}

export type AppMutationShowMessageBoxArgs = {
  message?: InputMaybe<Scalars['String']>
}

export type AppQuery = {
  __typename?: 'AppQuery'
  isDarkMode?: Maybe<Scalars['Boolean']>
  themeMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type ConfigMutation = {
  __typename?: 'ConfigMutation'
  updateConfig?: Maybe<MutationResult>
}

export type ConfigMutationUpdateConfigArgs = {
  key?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['ConfigValue']>
}

export type ConfigQuery = {
  __typename?: 'ConfigQuery'
  AppearanceTheme?: Maybe<Scalars['String']>
  DelayBetweenRequests?: Maybe<Scalars['Float']>
  MaxmumConcurrentRequests?: Maybe<Scalars['Float']>
}

export type DictFileQuery = {
  __typename?: 'DictFileQuery'
  fileName?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  list?: Maybe<Array<Maybe<Scalars['String']>>>
  typeId?: Maybe<Scalars['Int']>
}

export type DictTypeQuery = {
  __typename?: 'DictTypeQuery'
  files?: Maybe<Array<Maybe<DictFileQuery>>>
  id?: Maybe<Scalars['Int']>
  typeName?: Maybe<Scalars['String']>
}

export type MutationResult = {
  __typename?: 'MutationResult'
  message?: Maybe<Scalars['String']>
  successful?: Maybe<Scalars['Boolean']>
}

export type RootMutationType = {
  __typename?: 'RootMutationType'
  app?: Maybe<AppMutation>
  config?: Maybe<ConfigMutation>
}

export type RootQueryType = {
  __typename?: 'RootQueryType'
  app?: Maybe<AppQuery>
  config?: Maybe<ConfigQuery>
  dictType?: Maybe<Array<Maybe<DictTypeQuery>>>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<
  TResult,
  TParent = Record<string, unknown>,
  TContext = Record<string, unknown>,
  TArgs = Record<string, unknown>
> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = Record<string, unknown>,
  TContext = Record<string, unknown>,
  TArgs = Record<string, unknown>
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<
  TTypes,
  TParent = Record<string, unknown>,
  TContext = Record<string, unknown>
> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = Record<string, unknown>, TContext = Record<string, unknown>> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = Record<string, unknown>,
  TParent = Record<string, unknown>,
  TContext = Record<string, unknown>,
  TArgs = Record<string, unknown>
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AppMutation: ResolverTypeWrapper<AppMutation>
  AppQuery: ResolverTypeWrapper<AppQuery>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  ConfigMutation: ResolverTypeWrapper<ConfigMutation>
  ConfigQuery: ResolverTypeWrapper<ConfigQuery>
  ConfigValue: ResolverTypeWrapper<Scalars['ConfigValue']>
  Date: ResolverTypeWrapper<Scalars['Date']>
  DictFileQuery: ResolverTypeWrapper<DictFileQuery>
  DictTypeQuery: ResolverTypeWrapper<DictTypeQuery>
  Float: ResolverTypeWrapper<Scalars['Float']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  MutationResult: ResolverTypeWrapper<MutationResult>
  RootMutationType: ResolverTypeWrapper<Record<string, never>>
  RootQueryType: ResolverTypeWrapper<Record<string, never>>
  String: ResolverTypeWrapper<Scalars['String']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AppMutation: AppMutation
  AppQuery: AppQuery
  Boolean: Scalars['Boolean']
  ConfigMutation: ConfigMutation
  ConfigQuery: ConfigQuery
  ConfigValue: Scalars['ConfigValue']
  Date: Scalars['Date']
  DictFileQuery: DictFileQuery
  DictTypeQuery: DictTypeQuery
  Float: Scalars['Float']
  Int: Scalars['Int']
  MutationResult: MutationResult
  RootMutationType: Record<string, never>
  RootQueryType: Record<string, never>
  String: Scalars['String']
}

export type AppMutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AppMutation'] = ResolversParentTypes['AppMutation']
> = {
  clipboardWriteText?: Resolver<
    Maybe<ResolversTypes['MutationResult']>,
    ParentType,
    ContextType,
    Partial<AppMutationClipboardWriteTextArgs>
  >
  showMessageBox?: Resolver<
    Maybe<ResolversTypes['MutationResult']>,
    ParentType,
    ContextType,
    Partial<AppMutationShowMessageBoxArgs>
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type AppQueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AppQuery'] = ResolversParentTypes['AppQuery']
> = {
  isDarkMode?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  themeMode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ConfigMutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ConfigMutation'] = ResolversParentTypes['ConfigMutation']
> = {
  updateConfig?: Resolver<
    Maybe<ResolversTypes['MutationResult']>,
    ParentType,
    ContextType,
    Partial<ConfigMutationUpdateConfigArgs>
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ConfigQueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ConfigQuery'] = ResolversParentTypes['ConfigQuery']
> = {
  AppearanceTheme?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  DelayBetweenRequests?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  MaxmumConcurrentRequests?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface ConfigValueScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['ConfigValue'], any> {
  name: 'ConfigValue'
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type DictFileQueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DictFileQuery'] = ResolversParentTypes['DictFileQuery']
> = {
  fileName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>
  typeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DictTypeQueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DictTypeQuery'] = ResolversParentTypes['DictTypeQuery']
> = {
  files?: Resolver<Maybe<Array<Maybe<ResolversTypes['DictFileQuery']>>>, ParentType, ContextType>
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  typeName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MutationResult'] = ResolversParentTypes['MutationResult']
> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  successful?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type RootMutationTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RootMutationType'] = ResolversParentTypes['RootMutationType']
> = {
  app?: Resolver<Maybe<ResolversTypes['AppMutation']>, ParentType, ContextType>
  config?: Resolver<Maybe<ResolversTypes['ConfigMutation']>, ParentType, ContextType>
}

export type RootQueryTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RootQueryType'] = ResolversParentTypes['RootQueryType']
> = {
  app?: Resolver<Maybe<ResolversTypes['AppQuery']>, ParentType, ContextType>
  config?: Resolver<Maybe<ResolversTypes['ConfigQuery']>, ParentType, ContextType>
  dictType?: Resolver<Maybe<Array<Maybe<ResolversTypes['DictTypeQuery']>>>, ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  AppMutation?: AppMutationResolvers<ContextType>
  AppQuery?: AppQueryResolvers<ContextType>
  ConfigMutation?: ConfigMutationResolvers<ContextType>
  ConfigQuery?: ConfigQueryResolvers<ContextType>
  ConfigValue?: GraphQLScalarType
  Date?: GraphQLScalarType
  DictFileQuery?: DictFileQueryResolvers<ContextType>
  DictTypeQuery?: DictTypeQueryResolvers<ContextType>
  MutationResult?: MutationResultResolvers<ContextType>
  RootMutationType?: RootMutationTypeResolvers<ContextType>
  RootQueryType?: RootQueryTypeResolvers<ContextType>
}
