/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ConfigKey: 'AppearanceTheme' | 'MaxmumConcurrentRequests' | 'DelayBetweenRequests';
  ConfigValue: string | number | boolean | Date;
  Date: Date;
};

export type AppMutation = {
  __typename?: 'AppMutation';
  clipboardWriteText?: Maybe<MutationResult>;
  showMessageBox?: Maybe<MutationResult>;
};


export type AppMutationClipboardWriteTextArgs = {
  text?: InputMaybe<Scalars['String']>;
};


export type AppMutationShowMessageBoxArgs = {
  message?: InputMaybe<Scalars['String']>;
};

export type AppQuery = {
  __typename?: 'AppQuery';
  isDarkMode?: Maybe<Scalars['Boolean']>;
  themeMode?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type ConfigMutation = {
  __typename?: 'ConfigMutation';
  updateConfig?: Maybe<MutationResult>;
};


export type ConfigMutationUpdateConfigArgs = {
  key?: InputMaybe<Scalars['ConfigKey']>;
  value?: InputMaybe<Scalars['ConfigValue']>;
};

export type ConfigQuery = {
  __typename?: 'ConfigQuery';
  AppearanceTheme?: Maybe<Scalars['String']>;
  DelayBetweenRequests?: Maybe<Scalars['Float']>;
  MaxmumConcurrentRequests?: Maybe<Scalars['Float']>;
};

export type DictFileQuery = {
  __typename?: 'DictFileQuery';
  fileName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  list?: Maybe<Array<Maybe<Scalars['String']>>>;
  typeId?: Maybe<Scalars['Int']>;
};

export type DictTypeQuery = {
  __typename?: 'DictTypeQuery';
  files?: Maybe<Array<Maybe<DictFileQuery>>>;
  id?: Maybe<Scalars['Int']>;
  typeName?: Maybe<Scalars['String']>;
};

export type MutationResult = {
  __typename?: 'MutationResult';
  message?: Maybe<Scalars['String']>;
  successful?: Maybe<Scalars['Boolean']>;
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  app?: Maybe<AppMutation>;
  config?: Maybe<ConfigMutation>;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  app?: Maybe<AppQuery>;
  config?: Maybe<ConfigQuery>;
  dictType?: Maybe<Array<Maybe<DictTypeQuery>>>;
};

export type GetAppInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppInfoQuery = { __typename?: 'RootQueryType', app?: { __typename?: 'AppQuery', version?: string | null, themeMode?: string | null, isDarkMode?: boolean | null } | null };

export type ClipboardWriteTextMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type ClipboardWriteTextMutation = { __typename?: 'RootMutationType', app?: { __typename?: 'AppMutation', clipboardWriteText?: { __typename?: 'MutationResult', successful?: boolean | null, message?: string | null } | null } | null };

export type ShowMessageBoxMutationVariables = Exact<{
  message: Scalars['String'];
}>;


export type ShowMessageBoxMutation = { __typename?: 'RootMutationType', app?: { __typename?: 'AppMutation', showMessageBox?: { __typename?: 'MutationResult', successful?: boolean | null, message?: string | null } | null } | null };

export type GetConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConfigQuery = { __typename?: 'RootQueryType', config?: { __typename?: 'ConfigQuery', AppearanceTheme?: string | null, MaxmumConcurrentRequests?: number | null, DelayBetweenRequests?: number | null } | null };

export type UpdateConfigMutationVariables = Exact<{
  key: Scalars['ConfigKey'];
  value: Scalars['ConfigValue'];
}>;


export type UpdateConfigMutation = { __typename?: 'RootMutationType', config?: { __typename?: 'ConfigMutation', updateConfig?: { __typename?: 'MutationResult', successful?: boolean | null, message?: string | null } | null } | null };


export const GetAppInfoDocument = `
    query GetAppInfo {
  app {
    version
    themeMode
    isDarkMode
  }
}
    `;
export const ClipboardWriteTextDocument = `
    mutation ClipboardWriteText($text: String!) {
  app {
    clipboardWriteText(text: $text) {
      successful
      message
    }
  }
}
    `;
export const ShowMessageBoxDocument = `
    mutation ShowMessageBox($message: String!) {
  app {
    showMessageBox(message: $message) {
      successful
      message
    }
  }
}
    `;
export const GetConfigDocument = `
    query GetConfig {
  config {
    AppearanceTheme
    MaxmumConcurrentRequests
    DelayBetweenRequests
  }
}
    `;
export const UpdateConfigDocument = `
    mutation UpdateConfig($key: ConfigKey!, $value: ConfigValue!) {
  config {
    updateConfig(key: $key, value: $value) {
      successful
      message
    }
  }
}
    `;
export type Requester<C = {}, E = unknown> = <R, V>(doc: string, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    GetAppInfo(variables?: GetAppInfoQueryVariables, options?: C): Promise<GetAppInfoQuery> {
      return requester<GetAppInfoQuery, GetAppInfoQueryVariables>(GetAppInfoDocument, variables, options) as Promise<GetAppInfoQuery>;
    },
    ClipboardWriteText(variables: ClipboardWriteTextMutationVariables, options?: C): Promise<ClipboardWriteTextMutation> {
      return requester<ClipboardWriteTextMutation, ClipboardWriteTextMutationVariables>(ClipboardWriteTextDocument, variables, options) as Promise<ClipboardWriteTextMutation>;
    },
    ShowMessageBox(variables: ShowMessageBoxMutationVariables, options?: C): Promise<ShowMessageBoxMutation> {
      return requester<ShowMessageBoxMutation, ShowMessageBoxMutationVariables>(ShowMessageBoxDocument, variables, options) as Promise<ShowMessageBoxMutation>;
    },
    GetConfig(variables?: GetConfigQueryVariables, options?: C): Promise<GetConfigQuery> {
      return requester<GetConfigQuery, GetConfigQueryVariables>(GetConfigDocument, variables, options) as Promise<GetConfigQuery>;
    },
    UpdateConfig(variables: UpdateConfigMutationVariables, options?: C): Promise<UpdateConfigMutation> {
      return requester<UpdateConfigMutation, UpdateConfigMutationVariables>(UpdateConfigDocument, variables, options) as Promise<UpdateConfigMutation>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;