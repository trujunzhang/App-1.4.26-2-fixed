/* eslint-disable @typescript-eslint/no-explicit-any */

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default';
type Id = number | string;

type InitialAndShowNotifyParams = {isSmallScreenWidth: boolean; message: string; type?: ToastType; autoClose?: number | false};

type InitialAndShowNotify = (params: InitialAndShowNotifyParams) => Id;

type UpdateNotifyParams = {isSmallScreenWidth: boolean; id: Id | null; message: string; type?: ToastType; autoClose?: number | false};
type UpdateNotify = (params: UpdateNotifyParams) => void;

export type {ToastType, InitialAndShowNotify, UpdateNotify};
