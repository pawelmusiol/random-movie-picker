import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootStore, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector