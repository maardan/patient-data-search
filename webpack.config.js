var webpack = require('webpack');

module.exports = {
	entry: './client/index.js',
	// devtool: 'inline-source-map',
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			},
			{ 
				test: /\.css$/, 
				loader: "style-loader!css-loader" 
			}
		]
	},
    plugins:
    [
    	new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.UglifyJsPlugin(
		{
            output: 
            {
                comments: false
            },  
			compress:
			{
				warnings: false
			}
	    })
  	]
};