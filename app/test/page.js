import ServerActions from "./serverActions";
import Fetching from "./fetching";

export default function Page() {
  return (
    <>
      <Fetching />
      <ServerActions />
    </>
  );
}
