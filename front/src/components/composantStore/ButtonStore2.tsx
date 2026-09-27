import { useButtonTestStore } from "@/stores/buttonTestStore";

export default function ButtonTest2() {
  const { count, inc } = useButtonTestStore();
  return (
    <div>
      <p>{count}</p>
      <button onClick={inc}>button 2</button>
    </div>
  );
}
