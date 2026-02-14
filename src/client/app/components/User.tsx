import { useStore } from "../store";

export default function User() {
  const [state, setState] = useStore();
  return (
    <>
      {state.username ? (
        <p>Playing as {state.username}</p>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter username"
            onChange={(e) => setState({ username: e.target.value })}
          />
        </div>
      )}
    </>
  );
}
