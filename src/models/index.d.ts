import { ModelInit, MutableModel, __modelMeta__, CompositeIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerMaintenance = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<Maintenance, ['equipmentId', 'timestamp']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly equipmentId: string;
  readonly timestamp: string;
  readonly tasks: string;
  readonly createdBy: string;
  readonly maintenanceType: string;
  readonly comments?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMaintenance = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<Maintenance, ['equipmentId', 'timestamp']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly equipmentId: string;
  readonly timestamp: string;
  readonly tasks: string;
  readonly createdBy: string;
  readonly maintenanceType: string;
  readonly comments?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Maintenance = LazyLoading extends LazyLoadingDisabled ? EagerMaintenance : LazyMaintenance

export declare const Maintenance: (new (init: ModelInit<Maintenance>) => Maintenance) & {
  copyOf(source: Maintenance, mutator: (draft: MutableModel<Maintenance>) => MutableModel<Maintenance> | void): Maintenance;
}