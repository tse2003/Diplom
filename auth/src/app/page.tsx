"use client"

export default function Home() {
  return (
    <div>
      <div className="m-auto w-[900px] bg-slate-300">
        <h1 className="text-2xl font-bold text-center pb-2">ШИНЭ ОРОН СУУЦУУД</h1>
        <div className="carousel w-full h-56">
          <div id="item1" className="carousel-item w-full">
            <img src="./new/1.png" className="w-full" />
          </div>
          <div id="item2" className="carousel-item w-full">
            <img src="./new/2.png" className="w-full" />
          </div>
          <div id="item3" className="carousel-item w-full">
            <img src="./new/3.png" className="w-full" />
          </div>
          <div id="item4" className="carousel-item w-full">
            <img src="./new/4.png" className="w-full" />
          </div>
        </div>
        <div className="flex w-full justify-center gap-2 py-2">
          <a href="#item1" className="btn btn-xs">1</a>
          <a href="#item2" className="btn btn-xs">2</a>
          <a href="#item3" className="btn btn-xs">3</a>
          <a href="#item4" className="btn btn-xs">4</a>
        </div>

        <h1 className="text-2xl font-bold text-center pb-2 pt-5">ОНЦЛОХ ЗАРУУД</h1>
        <div className="flex gap-2 justify-center">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img src="./ontslokh/1.jpg" className="w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Бзд цэцэрлэгт хүрээлэн national park хотхонд 2 өрөө орон сууц 57,54м2</h2>
              <p>Цэцэрлэгт хүрээлэнгийн ард, дүнжингарав худалдааны төвийн урд National park хотхоны 2 давхарт урагш харсан цонхтой, гэрчилгээ бэлэн 57.54мкв 2 өрөөг 275 саяд худалдана. М.кв-ийн үнэ: 4.7сая</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Дэлгэрэнгүй</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img src="./ontslokh/1.jpg" className="w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Бзд цэцэрлэгт хүрээлэн national park хотхонд 2 өрөө орон сууц 57,54м2</h2>
              <p>Цэцэрлэгт хүрээлэнгийн ард, дүнжингарав худалдааны төвийн урд National park хотхоны 2 давхарт урагш харсан цонхтой, гэрчилгээ бэлэн 57.54мкв 2 өрөөг 275 саяд худалдана. М.кв-ийн үнэ: 4.7сая</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Дэлгэрэнгүй</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-center pt-2">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img src="./ontslokh/1.jpg" className="w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Бзд цэцэрлэгт хүрээлэн national park хотхонд 2 өрөө орон сууц 57,54м2</h2>
              <p>Цэцэрлэгт хүрээлэнгийн ард, дүнжингарав худалдааны төвийн урд National park хотхоны 2 давхарт урагш харсан цонхтой, гэрчилгээ бэлэн 57.54мкв 2 өрөөг 275 саяд худалдана. М.кв-ийн үнэ: 4.7сая</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Дэлгэрэнгүй</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img src="./ontslokh/1.jpg" className="w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Бзд цэцэрлэгт хүрээлэн national park хотхонд 2 өрөө орон сууц 57,54м2</h2>
              <p>Цэцэрлэгт хүрээлэнгийн ард, дүнжингарав худалдааны төвийн урд National park хотхоны 2 давхарт урагш харсан цонхтой, гэрчилгээ бэлэн 57.54мкв 2 өрөөг 275 саяд худалдана. М.кв-ийн үнэ: 4.7сая</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Дэлгэрэнгүй</button>
              </div>
            </div>
          </div>
        </div>


        <h1 className="text-2xl font-bold text-center pb-2 pt-5">ОНЦЛОХ МЭДЭЭНҮҮД</h1>
        <div className="flex gap-2 justify-center">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img src="./medee/1.jpg" className="w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">ААН, иргэн өөрийн газар дээрээ барилга, зөвшөөрөл хүсдэг байдлыг болиулна</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Дэлгэрэнгүй</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img src="./medee/1.jpg" className="w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">ААН, иргэн өөрийн газар дээрээ барилга, зөвшөөрөл хүсдэг байдлыг болиулна</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Дэлгэрэнгүй</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-center pt-2">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img src="./medee/1.jpg" className="w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">ААН, иргэн өөрийн газар дээрээ барилга, зөвшөөрөл хүсдэг байдлыг болиулна</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Дэлгэрэнгүй</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img src="./medee/1.jpg" className="w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">ААН, иргэн өөрийн газар дээрээ барилга, зөвшөөрөл хүсдэг байдлыг болиулна</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Дэлгэрэнгүй</button>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
