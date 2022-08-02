import mockjs from 'mockjs';
const Mock = mockjs.mock;

export const mock = Mock({
	photos: {
		'page|+1': 1,
		pages: '@number(1000, 10000)',
		perpage: 100,
		total: '@number(1000, 10000)',
		'photo|100': [
			{
				'url|1': [ '@image(100x100, "#FF6600")', '@image(100x120, "#FF6600")', '@image(100x130, "#FF6600")' ],
				id: '@uuid()'
			}
		]
	},
	stat: 'ok'
});
