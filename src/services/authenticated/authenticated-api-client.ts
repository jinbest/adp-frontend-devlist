import axios from "axios"
import firebase from "firebase"
import { isEmpty } from "lodash"

export default class AuthenticatedApiClient {
  private static instance: AuthenticatedApiClient

  private constructor() {
    //EMPTY
  }

  public static getInstance(): AuthenticatedApiClient {
    if (!AuthenticatedApiClient.instance) {
      AuthenticatedApiClient.instance = new AuthenticatedApiClient()
    }

    return AuthenticatedApiClient.instance
  }

  async get<T>(url: string, options: Record<string, any> = {}): Promise<T> {
    url = this.addQueryParamsToUrl(url, options)
    const authorization = await this.getCurrentUserAuthorization()
    const data = await axios.get(url, {
      headers: {
        Authorization: authorization,
      },
    })
    return data.data as T
  }

  async post<T>(
    url: string,
    body?: Record<string, any>,
    options?: Record<string, any>
  ): Promise<T> {
    url = this.addQueryParamsToUrl(url, options)

    const authorization = await this.getCurrentUserAuthorization()

    return (
      await axios.post(url, body, {
        headers: {
          Authorization: authorization,
        },
      })
    ).data as T
  }

  async put<T>(url: string, body?: Record<string, any>, options?: Record<string, any>): Promise<T> {
    url = this.addQueryParamsToUrl(url, options)

    const authorization = await this.getCurrentUserAuthorization()

    return (
      await axios.put(url, body, {
        headers: {
          Authorization: authorization,
        },
      })
    ).data as T
  }

  async patch<T>(
    url: string,
    body?: Record<string, any>,
    options?: Record<string, any>
  ): Promise<T> {
    url = this.addQueryParamsToUrl(url, options)

    const authorization = await this.getCurrentUserAuthorization()

    return (
      await axios.patch(url, body, {
        headers: {
          Authorization: authorization,
        },
      })
    ).data as T
  }

  async delete<T>(
    url: string,
    body?: Record<string, any>,
    options?: Record<string, any>
  ): Promise<T> {
    url = this.addQueryParamsToUrl(url, options)
    const authorization = await this.getCurrentUserAuthorization()
    return (
      await axios.delete(url, {
        headers: {
          Authorization: authorization,
        },
        data: body,
      })
    ).data as T
  }

  private objectToQueryString(options: Record<string, any> = {}): string {
    return Object.keys(options)
      .map((key) => `${key}=${options[key]}`)
      .join("&")
  }

  private addQueryParamsToUrl(url: string, options?: Record<string, any>): string {
    return !isEmpty(options) ? url.trim() + "?" + this.objectToQueryString(options) : url
  }

  async getCurrentUserAuthorization() {
    const currentUser = firebase.auth().currentUser
    if (currentUser) {
      const token = await currentUser.getIdToken()
      return `Bearer ${token}`.trim()
    } else {
      return ""
    }
  }
}
