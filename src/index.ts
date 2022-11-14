import Redis, { RedisOptions } from 'ioredis';

export class DelayRequest {

  private redis;

  constructor(otps: RedisOptions) {
    this.redis = new Redis(otps);
  }

  private sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * 
   * @param {number} ms - Number of milliseconds delay.
   * @param {number} ttl - Time of seconds expires.
   * @param {string} key - Key can be consumed by IP address, user ID, authorisation token, API route or any other string.
   *
   */
  async delay({ ms, ttl, key }: { ms: number, ttl: number, key: string }) {
    const requests = await this.redis.incr(key);
    if (requests === 1) {
      await this.redis.expire(key, ttl);
      return;
    }
    const time = (Number(requests) - 2) * ms + ms;
    await this.sleep(time);
  }
}
