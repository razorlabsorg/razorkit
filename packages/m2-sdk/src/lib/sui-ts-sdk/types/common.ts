// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { Infer } from '../../../utils/superstruct';
import {
  boolean,
  define,
  literal,
  nullable,
  object,
  record,
  string,
  union,
} from '../../../utils/superstruct';
import { SharedObjectRef, SuiObjectRef } from './objects';

export type ObjectArg =
  | {
      ImmOrOwnedObject: SuiObjectRef;
    }
  | {
      SharedObject: SharedObjectRef;
    }
  | {
      Receiving: SuiObjectRef;
    };
export type ObjectCallArg = {
  Object: ObjectArg;
};
/**
 * A pure argument.
 */
export type PureArg = {
  Pure: Array<number>;
};
export declare function isPureArg(arg: any): arg is PureArg;
/**
 * An argument for the transaction. It is a 'meant' enum which expects to have
 * one of the optional properties. If not, the BCS error will be thrown while
 * attempting to form a transaction.
 *
 * Example:
 * ```js
 * let arg1: CallArg = { Object: { Shared: {
 *   objectId: '5460cf92b5e3e7067aaace60d88324095fd22944',
 *   initialSharedVersion: 1,
 *   mutable: true,
 * } } };
 * let arg2: CallArg = { Pure: bcs.ser(BCS.STRING, 100000).toBytes() };
 * let arg3: CallArg = { Object: { ImmOrOwned: {
 *   objectId: '4047d2e25211d87922b6650233bd0503a6734279',
 *   version: 1,
 *   digest: 'bCiANCht4O9MEUhuYjdRCqRPZjr2rJ8MfqNiwyhmRgA='
 * } } };
 * ```
 *
 * For `Pure` arguments BCS is required. You must encode the values with BCS according
 * to the type required by the called function. Pure accepts only serialized values
 */
export type CallArg = PureArg | ObjectCallArg;

export const ObjectOwner = union([
  object({
    AddressOwner: string(),
  }),
  object({
    ObjectOwner: string(),
  }),
  object({
    Shared: object({
      initial_shared_version: nullable(string()),
    }),
  }),
  literal('Immutable'),
]);
export type ObjectOwner = Infer<typeof ObjectOwner>;

export type SuiJsonValue =
  | boolean
  | number
  | string
  | CallArg
  | Array<SuiJsonValue>;
export const SuiJsonValue = define<SuiJsonValue>('SuiJsonValue', () => true);

const ProtocolConfigValue = union([
  object({ u32: string() }),
  object({ u64: string() }),
  object({ f64: string() }),
]);
type ProtocolConfigValue = Infer<typeof ProtocolConfigValue>;

export const ProtocolConfig = object({
  attributes: record(string(), nullable(ProtocolConfigValue)),
  featureFlags: record(string(), boolean()),
  maxSupportedProtocolVersion: string(),
  minSupportedProtocolVersion: string(),
  protocolVersion: string(),
});
export type ProtocolConfig = Infer<typeof ProtocolConfig>;
