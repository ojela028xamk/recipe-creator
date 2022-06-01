import { MockData } from "../common/MockData";
import { MockDataTS } from "../interfaces/MockDataTS";

export default function BrowseRecipes(): JSX.Element {
  return (
    <div className="p-4">
      <h1>Browse Recipes</h1>
      {MockData.map((data: MockDataTS) => (
        <>
          <p>{data.title}</p>

          <ul>
            {data.instructions.map((node: string) => (
              <li>{node}</li>
            ))}
          </ul>
        </>
      ))}
    </div>
  );
}
