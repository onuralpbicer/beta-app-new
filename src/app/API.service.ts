/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreateMaintenance: OnCreateMaintenanceSubscription;
  onUpdateMaintenance: OnUpdateMaintenanceSubscription;
  onDeleteMaintenance: OnDeleteMaintenanceSubscription;
};

export type CreateMaintenanceInput = {
  equipmentId: string;
  timestamp: string;
  tasks: string;
  createdBy: string;
  maintenanceType: string;
  comments?: string | null;
  _version?: number | null;
};

export type ModelMaintenanceConditionInput = {
  tasks?: ModelStringInput | null;
  createdBy?: ModelStringInput | null;
  maintenanceType?: ModelStringInput | null;
  comments?: ModelStringInput | null;
  and?: Array<ModelMaintenanceConditionInput | null> | null;
  or?: Array<ModelMaintenanceConditionInput | null> | null;
  not?: ModelMaintenanceConditionInput | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Maintenance = {
  __typename: "Maintenance";
  equipmentId: string;
  timestamp: string;
  tasks: string;
  createdBy: string;
  maintenanceType: string;
  comments?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  owner?: string | null;
};

export type UpdateMaintenanceInput = {
  equipmentId: string;
  timestamp: string;
  tasks?: string | null;
  createdBy?: string | null;
  maintenanceType?: string | null;
  comments?: string | null;
  _version?: number | null;
};

export type DeleteMaintenanceInput = {
  equipmentId: string;
  timestamp: string;
  _version?: number | null;
};

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelMaintenanceFilterInput = {
  equipmentId?: ModelIDInput | null;
  timestamp?: ModelStringInput | null;
  tasks?: ModelStringInput | null;
  createdBy?: ModelStringInput | null;
  maintenanceType?: ModelStringInput | null;
  comments?: ModelStringInput | null;
  and?: Array<ModelMaintenanceFilterInput | null> | null;
  or?: Array<ModelMaintenanceFilterInput | null> | null;
  not?: ModelMaintenanceFilterInput | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export type ModelMaintenanceConnection = {
  __typename: "ModelMaintenanceConnection";
  items: Array<Maintenance | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelSubscriptionMaintenanceFilterInput = {
  equipmentId?: ModelSubscriptionIDInput | null;
  timestamp?: ModelSubscriptionStringInput | null;
  tasks?: ModelSubscriptionStringInput | null;
  createdBy?: ModelSubscriptionStringInput | null;
  maintenanceType?: ModelSubscriptionStringInput | null;
  comments?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionMaintenanceFilterInput | null> | null;
  or?: Array<ModelSubscriptionMaintenanceFilterInput | null> | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type CreateMaintenanceMutation = {
  __typename: "Maintenance";
  equipmentId: string;
  timestamp: string;
  tasks: string;
  createdBy: string;
  maintenanceType: string;
  comments?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  owner?: string | null;
};

export type UpdateMaintenanceMutation = {
  __typename: "Maintenance";
  equipmentId: string;
  timestamp: string;
  tasks: string;
  createdBy: string;
  maintenanceType: string;
  comments?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  owner?: string | null;
};

export type DeleteMaintenanceMutation = {
  __typename: "Maintenance";
  equipmentId: string;
  timestamp: string;
  tasks: string;
  createdBy: string;
  maintenanceType: string;
  comments?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  owner?: string | null;
};

export type GetMaintenanceQuery = {
  __typename: "Maintenance";
  equipmentId: string;
  timestamp: string;
  tasks: string;
  createdBy: string;
  maintenanceType: string;
  comments?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  owner?: string | null;
};

export type ListMaintenancesQuery = {
  __typename: "ModelMaintenanceConnection";
  items: Array<{
    __typename: "Maintenance";
    equipmentId: string;
    timestamp: string;
    tasks: string;
    createdBy: string;
    maintenanceType: string;
    comments?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    owner?: string | null;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type SyncMaintenancesQuery = {
  __typename: "ModelMaintenanceConnection";
  items: Array<{
    __typename: "Maintenance";
    equipmentId: string;
    timestamp: string;
    tasks: string;
    createdBy: string;
    maintenanceType: string;
    comments?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    owner?: string | null;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type OnCreateMaintenanceSubscription = {
  __typename: "Maintenance";
  equipmentId: string;
  timestamp: string;
  tasks: string;
  createdBy: string;
  maintenanceType: string;
  comments?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  owner?: string | null;
};

export type OnUpdateMaintenanceSubscription = {
  __typename: "Maintenance";
  equipmentId: string;
  timestamp: string;
  tasks: string;
  createdBy: string;
  maintenanceType: string;
  comments?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  owner?: string | null;
};

export type OnDeleteMaintenanceSubscription = {
  __typename: "Maintenance";
  equipmentId: string;
  timestamp: string;
  tasks: string;
  createdBy: string;
  maintenanceType: string;
  comments?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  owner?: string | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateMaintenance(
    input: CreateMaintenanceInput,
    condition?: ModelMaintenanceConditionInput
  ): Promise<CreateMaintenanceMutation> {
    const statement = `mutation CreateMaintenance($input: CreateMaintenanceInput!, $condition: ModelMaintenanceConditionInput) {
        createMaintenance(input: $input, condition: $condition) {
          __typename
          equipmentId
          timestamp
          tasks
          createdBy
          maintenanceType
          comments
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateMaintenanceMutation>response.data.createMaintenance;
  }
  async UpdateMaintenance(
    input: UpdateMaintenanceInput,
    condition?: ModelMaintenanceConditionInput
  ): Promise<UpdateMaintenanceMutation> {
    const statement = `mutation UpdateMaintenance($input: UpdateMaintenanceInput!, $condition: ModelMaintenanceConditionInput) {
        updateMaintenance(input: $input, condition: $condition) {
          __typename
          equipmentId
          timestamp
          tasks
          createdBy
          maintenanceType
          comments
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateMaintenanceMutation>response.data.updateMaintenance;
  }
  async DeleteMaintenance(
    input: DeleteMaintenanceInput,
    condition?: ModelMaintenanceConditionInput
  ): Promise<DeleteMaintenanceMutation> {
    const statement = `mutation DeleteMaintenance($input: DeleteMaintenanceInput!, $condition: ModelMaintenanceConditionInput) {
        deleteMaintenance(input: $input, condition: $condition) {
          __typename
          equipmentId
          timestamp
          tasks
          createdBy
          maintenanceType
          comments
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteMaintenanceMutation>response.data.deleteMaintenance;
  }
  async GetMaintenance(
    equipmentId: string,
    timestamp: string
  ): Promise<GetMaintenanceQuery> {
    const statement = `query GetMaintenance($equipmentId: ID!, $timestamp: AWSDateTime!) {
        getMaintenance(equipmentId: $equipmentId, timestamp: $timestamp) {
          __typename
          equipmentId
          timestamp
          tasks
          createdBy
          maintenanceType
          comments
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      equipmentId,
      timestamp
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetMaintenanceQuery>response.data.getMaintenance;
  }
  async ListMaintenances(
    equipmentId?: string,
    timestamp?: ModelStringKeyConditionInput,
    filter?: ModelMaintenanceFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListMaintenancesQuery> {
    const statement = `query ListMaintenances($equipmentId: ID, $timestamp: ModelStringKeyConditionInput, $filter: ModelMaintenanceFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listMaintenances(
          equipmentId: $equipmentId
          timestamp: $timestamp
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          __typename
          items {
            __typename
            equipmentId
            timestamp
            tasks
            createdBy
            maintenanceType
            comments
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            owner
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (equipmentId) {
      gqlAPIServiceArguments.equipmentId = equipmentId;
    }
    if (timestamp) {
      gqlAPIServiceArguments.timestamp = timestamp;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListMaintenancesQuery>response.data.listMaintenances;
  }
  async SyncMaintenances(
    filter?: ModelMaintenanceFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncMaintenancesQuery> {
    const statement = `query SyncMaintenances($filter: ModelMaintenanceFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncMaintenances(
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          lastSync: $lastSync
        ) {
          __typename
          items {
            __typename
            equipmentId
            timestamp
            tasks
            createdBy
            maintenanceType
            comments
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            owner
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncMaintenancesQuery>response.data.syncMaintenances;
  }
  OnCreateMaintenanceListener(
    filter?: ModelSubscriptionMaintenanceFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateMaintenance">>
  > {
    const statement = `subscription OnCreateMaintenance($filter: ModelSubscriptionMaintenanceFilterInput) {
        onCreateMaintenance(filter: $filter) {
          __typename
          equipmentId
          timestamp
          tasks
          createdBy
          maintenanceType
          comments
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateMaintenance">>
    >;
  }

  OnUpdateMaintenanceListener(
    filter?: ModelSubscriptionMaintenanceFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateMaintenance">>
  > {
    const statement = `subscription OnUpdateMaintenance($filter: ModelSubscriptionMaintenanceFilterInput) {
        onUpdateMaintenance(filter: $filter) {
          __typename
          equipmentId
          timestamp
          tasks
          createdBy
          maintenanceType
          comments
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateMaintenance">>
    >;
  }

  OnDeleteMaintenanceListener(
    filter?: ModelSubscriptionMaintenanceFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteMaintenance">>
  > {
    const statement = `subscription OnDeleteMaintenance($filter: ModelSubscriptionMaintenanceFilterInput) {
        onDeleteMaintenance(filter: $filter) {
          __typename
          equipmentId
          timestamp
          tasks
          createdBy
          maintenanceType
          comments
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteMaintenance">>
    >;
  }
}
