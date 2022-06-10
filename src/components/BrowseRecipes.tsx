import { MockData } from "../common/MockData";
import { MockDataTS } from "../interfaces/MockDataTS";

export default function BrowseRecipes(): JSX.Element {
  return (
    <div className="p-4">
      <h1>Browse Recipes</h1>
      {MockData.map((data: MockDataTS) => (
        <>
          <div className="m-3 p-2 border w-50">
            <h3>{data.title}</h3>
            <p>{data.instructions}</p>
          </div>
        </>
      ))}
    </div>
  );
}
