import { mock } from './mock';

interface IParams {
	url: string;
	method?: 'GET' | 'POST';
	data?: any;
}

export type IPhoto = {
	farm: number;
	id: string;
	isfamily: number;
	isfriend: number;
	ispublic: number;
	owner: string;
	secret: string;
	server: string;
	title: string;
};

export type IRes = {
	photos: {
		page: number;
		pages: number;
		perpage: number;
		total: number;
		photo: IPhoto[];
	};
	stat: string;
};

function req(params: IParams) {
	try {
		
	const { url, method = 'GET', data } = params;
	const fetchOptions: RequestInit = { method };
	if (method === 'POST') {
		fetchOptions.body = JSON.stringify(data);
	}
	return fetch(url, fetchOptions).then((res) => res.json());
	} catch (error) {
		console.log(error)
	}
}

// 缓存同样title下上一次的图片数据
let cacheLastImgs: IPhoto[] = [];

export async function getImgs(title: string = 'kittens', page: number = 1) {
	if (!title) {
		alert('please input your search title');
		return;
	}

	// 请求的是第一页，清空缓存
	if(page === 1) {
		cacheLastImgs = []
	}

	const res = await req({
		url: `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&format=json&nojsoncallback=1&safe_search=${page}&text=${title}`
	}) as IRes

	// 本次请求的图片资源
	const nowPhoto = res?.photos?.photo??[]

	// 缓存本次的图片资源
	cacheLastImgs = cacheLastImgs.concat(nowPhoto)

	// 相同title，拼接图片
	if(page > 1) {
		res.photos.photo = nowPhoto.concat(cacheLastImgs)
	}
	return res;

	// mockdata
	return mock;
}

export function phoneUrl(photo: IPhoto) {
	return `http://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg
	`;
	// handle mockdata
	// @ts-ignore
	return photo.url;
}
