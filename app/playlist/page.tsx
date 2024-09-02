export default function Playlist(){
    return(
        <section>
            <h3 className="font-bold text-3xl mb-2">Playlist</h3>
            <div className="grid grid-cols-4 gap-4">
            <Collection/>
            <Collection/>
            <Collection/>
            <Collection/>
        </div>
        </section>
        
    )
}


function Collection(){
    return(
    <div>
        <div className="relative flex justify-center">
        <div className="w-[90%] aspect-video bg-pink-300 absolute rounded-md  translate-y-1"></div>
        <div className="w-[95%] aspect-video bg-yellow-200 absolute translate-y-2 rounded-md"></div>
        <img src="/thumbnail.jpg" alt="thumbnail" className="w-full object-cover aspect-video rounded-md translate-y-3" />
    </div>
    <div className="mt-4 text-sm">
    <p>Playlist Name</p>
    <div className="text-xs space-x-1"><span>creator name</span> <span>&#8226;</span> <span>playlist</span></div>
    <span className="text-xs">view playlist</span>
    </div>
    </div>
    
    
    )
   
}