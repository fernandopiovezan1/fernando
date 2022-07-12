// import { onUnmounted, ref, Ref, UnwrapRef, watch } from "@vue/composition-api";
// import { observable } from "vue/types/umd";

// export interface Observable<T = any> {
//   subscribe(
//     onNext?: ((value: T) => void) | null,
//     onError?: ((error: any) => void) | null,
//     onComplete?: (() => void) | null
//   ): Subscription;
//   subscribe(observer?: Observer<T> | null): Subscription;
// }

// export interface Observer<T = any> {
//   start?: (subscription: Subscription) => void;
//   next?: (value: T) => void;
//   error?: (error: any) => void;
//   complete?: () => void;
// }

// export interface Subscription {
//   unsubscribe(): void;
//   readonly closed: boolean;
// }

// export function liveQuery<T>(querier: () => T | Promise<T>): Observable<T>;

// interface UseObservableOptions {
//   onError?: (err: any) => void;
// }
// export default function useLiveQueryCustomer<T>(
//   querier: () => Promise<T> | T,
//   deps: [Ref<UnwrapRef<number>>],
//   instance: [Ref<UnwrapRef<number>>],
//   finished: [Ref<UnwrapRef<boolean | null>>],
//   allusers: [Ref<UnwrapRef<boolean | null>>],
//   inbox: [Ref<UnwrapRef<boolean | null>>],
//   options?: UseObservableOptions
// ): Readonly<Ref<T>> {
//   const value = ref<T | undefined>();
//   const observable = liveQuery<T>(querier);
//   let subscription = observable.subscribe({
//     next: (val) => {
//       value.value = val;
//     },
//     error: options?.onError
//   });

//   watch(deps, () => {
//     subscription.unsubscribe();
//     subscription = observable.subscribe({
//       next: (val) => {
//         value.value = val;
//       },
//       error: options?.onError
//     });
//   });

//   watch(instance, () => {
//     subscription.unsubscribe();
//     subscription = observable.subscribe({
//       next: (val) => {
//         value.value = val;
//       },
//       error: options?.onError
//     });
//   });

//   watch(finished, () => {
//     subscription.unsubscribe();
//     subscription = observable.subscribe({
//       next: (val) => {
//         value.value = val;
//       },
//       error: options?.onError
//     });
//   });

//   watch(allusers, () => {
//     subscription.unsubscribe();
//     subscription = observable.subscribe({
//       next: (val) => {
//         value.value = val;
//       },
//       error: options?.onError
//     });
//   });

//   watch(inbox, () => {
//     console.log("watch inbox");
//     subscription.unsubscribe();
//     subscription = observable.subscribe({
//       next: (val) => {
//         value.value = val;
//       },
//       error: options?.onError
//     });
//   });

//   //TODO: Verificar com desinscrever ao desmontar o componente
//   // onUnmounted(() => {
//   //     subscription.unsubscribe();
//   // });

//   return value as Readonly<Ref<T>>;
// }
