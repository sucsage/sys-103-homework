
type IpDataType = {
  ip: string;
  userAgent: string;
}

type PlaceholderType = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default async function HOME() {

  const IpData = await fetch("https://dummyjson.com/ip");
  const JsonIpData: IpDataType = await IpData.json();
  // console.log(JsonIpData.ip);
  // console.log(JsonIpData.userAgent);

  let PlaceholderDataArray: PlaceholderType[] = [];

  for (let i = 0; i < 5; i++) {
    const PlaceholderData = await fetch(`https://jsonplaceholder.typicode.com/posts/${i + 1}`);
    const JsonPlaceholderData: PlaceholderType = await PlaceholderData.json();
    PlaceholderDataArray.push(JsonPlaceholderData)
  }
  // console.log(PlaceholderDataArray)

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* IP Card */}
        <IPtemplate
          ip={JsonIpData.ip}
          userAgent={JsonIpData.userAgent}
        />

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs font-medium tracking-widest text-gray-400 uppercase">
            Posts
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Post List */}
        <ul className="flex flex-col gap-4">
          {PlaceholderDataArray.map((item, index) => (
            <li key={index} className="list-none">
              <Placeholdertemplate
                userId={item.userId}
                id={item.id}
                title={item.title}
                body={item.body}
              />
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

function IPtemplate({ ip, userAgent }: IpDataType) {
  const isIPv6 = ip.includes(":");

  return (
    <div className="relative w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* accent bar */}
      <div className="h-0.5 w-full bg-linear-to-r from-emerald-400 via-blue-500 to-violet-500" />

      {/* header */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <p className="text-xs font-medium tracking-widest text-gray-400 uppercase">
          Connection Info
        </p>
      </div>

      <div className="border-t border-gray-100 mx-5" />

      {/* fields */}
      <div className="px-5 py-4 flex flex-col gap-4">

        {/* IP */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium tracking-widest text-gray-400 uppercase">
            IP Address
          </span>
          <div className="font-mono text-lg font-semibold text-blue-600 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
            {ip}
          </div>
          <span className="inline-flex items-center w-fit text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
            {isIPv6 ? "IPv6" : "IPv4"}
          </span>
        </div>

        {/* User Agent */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium tracking-widest text-gray-400 uppercase">
            User Agent
          </span>
          <div className="font-mono text-xs text-gray-700 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100 leading-relaxed break-all">
            {userAgent}
          </div>
        </div>

      </div>
    </div>
  );
}

function Placeholdertemplate({ userId, id, title, body }: PlaceholderType) {
  return (
    <div className="relative w-full max-w-lg bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* accent bar */}
      <div className="h-0.5 w-full bg-linear-to-r from-violet-400 via-pink-400 to-orange-400" />

      {/* header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center">
            <span className="text-xs font-semibold text-violet-600">U{userId}</span>
          </div>
          <span className="text-xs font-medium tracking-widest text-gray-400 uppercase">
            User {userId}
          </span>
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 border border-gray-200">
          #{id}
        </span>
      </div>

      <div className="border-t border-gray-100 mx-5" />

      {/* content */}
      <div className="px-5 py-4 flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-800 capitalize leading-snug">
          {title}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          {body}
        </p>
      </div>

      {/* footer */}
      <div className="px-5 pb-4 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-violet-50 text-violet-500 border border-violet-100">
          Post
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-orange-50 text-orange-500 border border-orange-100">
          ID {id}
        </span>
      </div>

    </div>
  );
}