require 'singleton'

class HintService

  include Singleton

  def initialize
    @words = []
    File.open('db/google-10000-english-usa-no-swears-long.txt').each_line do |line|
      @words << line
    end
    puts 'Dictionary successfully loaded in memory.'
  end
end