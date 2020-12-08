import React, { Component } from "react"
import { nanoid } from "nanoid"
import { Formik, Form, Field } from "./Formik"
import { Post } from "./Post"

/**
 * Little side note:
 *
 * For OOP reasons, I am using the old-school component creation with classes.
 * Additionally, I am using the syntax with a constructor. It is not necessary,
 * but sometimes required when building components with classes.
 *
 * I am using named instead of default exports - when you type in the component
 * name in JSX, VS Code's intellisense automatically imports it for you :)
 */

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
    }

    this.componentDidMount = this.componentDidMount.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.renderPosts = this.renderPosts.bind(this)
  }

  // load posts from local storage on mount
  componentDidMount() {
    const posts = JSON.parse(localStorage.getItem("webpack-posts"))

    if (!!posts) this.setState({ posts })
  }

  handleSubmit(values) {
    const newPost = {
      id: nanoid(),
      ...values,
    }

    const newPosts = [...this.state.posts, newPost]
    // save posts to local storage each time a new one is created
    localStorage.setItem("webpack-posts", JSON.stringify(newPosts))

    this.setState({ posts: newPosts })
  }

  handleDelete(id) {
    const newPosts = this.state.posts.filter((post) => post.id !== id)
    this.setState({ posts: newPosts })
  }

  renderPosts() {
    return (
      <div className="p-4">
        {this.state.posts.map((post) => (
          <Post
            key={post.id}
            {...post}
            onDelete={() => this.handleDelete(post.id)}
          />
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className="max-w-lg min-h-screen mx-auto">
        <div className="bg-gray-400 p-4">
          <Formik
            initialValues={{ title: "", body: "" }}
            onSubmit={this.handleSubmit}
          >
            {() => (
              <Form>
                <h1 className="text-3xl text-center text-white">New post</h1>
                <Field
                  name="title"
                  className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-4 py-2 px-4 block w-full appearance-none leading-normal"
                  placeholder="Post title"
                />
                <Field
                  name="body"
                  className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-4 py-2 px-4 block w-full appearance-none leading-normal"
                  placeholder="Post body"
                />

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {this.state.posts.length > 0 ? (
          this.renderPosts()
        ) : (
          <p className="text-base text-center">(You have no posts yet)</p>
        )}
      </div>
    )
  }
}
