const WelcomePage = () => {
    return (
        <div className="container">
            <div className="container">
                Logo
            </div>
            <div className="container">
                Title
            </div>
            <div className="container">
                <h1>About the app</h1>
                <h2>Feature list</h2>
                <h3>Release 0.9</h3>
                - add, remove and update url
                - implemented <a href="https://en.wikipedia.org/wiki/Approximate_string_matching">fuzzy-search</a> powered by <a href="https://fusejs.io/">Fuse.js</a>
            </div>
            <div className="container">
                <h2>License</h2>
                <p>MIT License</p>

                <p>Copyright (c) 2022</p>
                <p>
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
                </p> 
                <p>
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
                </p> 
                <p>
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.    
                </p> 
            </div>
        </div>
    )
}

export default WelcomePage