import { useButtonTestStore } from "@/stores/buttonTestStore";

export default function ButtonTest() {
  const { count, inc } = useButtonTestStore();
  return (
    <div>
      <p>{count}</p>
      <button onClick={inc}>button 1</button>
    </div>
  );
}
