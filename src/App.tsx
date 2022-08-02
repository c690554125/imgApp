import { useCallback, useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './app.less';
import { getImgs, IPhoto, phoneUrl } from './services';

const colunms = 4

function App() {
	const [ keyTitle, setKeyTitle ] = useState('kittens');
	const [ result, setResult ] = useState<any>();

	const titleChange = useCallback((e) => {
		setKeyTitle(e.target.value);
	}, []);

  const onSearch = () => {
    // new search title
    fetchImgs(1)
  }

  const onMore = () => {
    const nextPage = (result?.photos?.page || 0) + 1
    fetchImgs(nextPage)
  }

  const fetchImgs = (page: number = 1) => {
    getImgs(keyTitle, page).then((r) => {
			setResult(r);
		});
  }

	useEffect(() => {
    // Init
		fetchImgs(1)
	}, []);

	return (
		<div className="app">
			<div className="search-areas">
				<input className="search-title" value={keyTitle} onChange={titleChange} placeholder="search title" />
				<div className="op-areas">
        <button className="search-btn" onClick={onSearch}>Search</button>
        <button className="search-more" onClick={onMore}>More</button>
        </div>
			</div>
      {/* flex的布局写法，图片会自动补齐短边，但是会出现图片不停跳动补最短，一般不用 */}
			{/* <div className="imgs">{
        <div className="imgs-wrap-one">
          {
            result?.photos?.photo?.map((item: IPhoto) => <LazyLoadImage key={item.id}
            className='imgsrc' src={phoneUrl(item)} alt={item.title}
           />
          )}
        </div>
      }</div> */}
      <div className="imgs">
        {/* 通常做法会会分为几列容器来对应渲染。图片高度不一致，导致有的容器很空，可以在最后几张图片或者每张图片插入时，动态获取每个容器高度，将下一张要渲染的图片补齐到短容器中，这里时间不够先忽略了。*/}
        {new Array(colunms).fill('div').map((wrapItem, wrapIndex) => {
          return <div key={wrapIndex} className='imgs-wrap'>
            {
            result?.photos?.photo?.map((item: IPhoto, index: number) =>  {
              if(index % colunms !== wrapIndex) {
                return null
              }
              return <LazyLoadImage key={item.id}
              className='imgsrc' src={phoneUrl(item)} alt={item.title} placeholderSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAG1BMVEXMzMwAAACZmZkzMzOysrJ/f39mZmZMTExZWVkILLjnAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAmklEQVRYhe3RQQrCMBCF4YdkkmsUvIIHmFXXRbR22YXZu8j9MVM0lmpp3Or7oIU/kDJJASIiIqK/5PKj8wVd9MJeJSb0Fy1t8ep30muL4EbcSudIpT8N5fUILw1G7Lr8yp0jWq/yeoW0ihNwDmrtFcPUFVvkgMotz8EQ4tQVg5XjJ+mst45vX31cslM01luXbL79lURERES/6w4ftR+JUiBWQgAAAABJRU5ErkJggg=="
             />
            }
          )}
          </div>
        })}
      </div>
		</div>
	);
}

export default App;
