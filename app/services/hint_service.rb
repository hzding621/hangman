require 'singleton'

# This service implements a brute-force policy for finding a hint for a hangman game
# It is instantiated once as a singleton class and called from GamesController
class HintService

  include Singleton

  def initialize
    @words = []
    File.open(Rails.application.config.dictionary_file_path).each_line do |line|
      @words << line.chomp
    end
    puts "Dictionary successfully loaded #{@words.length} words in memory"
  end

  def find_matched_word_with_pattern(pattern)
    matched_word = []
    @words.each do |w|
      if w.length != pattern.length
        next
      end
      match = true
      pattern.each_char.with_index do |c, i|
        if c != '_' and c != w[i]
          match = false
        end
      end
      matched_word << w if match
    end
    matched_word
  end

  def filter_words_of_wrong_letters!(words, trials)
    words.delete_if do |w|
      trials.each_char.any? do |c|
        w.include? c
      end
    end
  end

  def build_frequency_tables(words)
    frequencies = {}
    words.each do |w|
      w.each_char do |c|
        frequencies[c] = (frequencies[c] || 0) + 1
      end
    end
    frequencies
  end

  def max_frequency_letter(frequency_table, trials)
    max_letter = 'a'
    max_frequency = 0
    frequency_table.each do |letter, frequency|
      if trials.include? letter
        next
      end
      if frequency > max_frequency
        max_letter = letter
        max_frequency = frequency
      end
    end
    max_letter
  end

  def find_hint(pattern, trials)
    matched_word = find_matched_word_with_pattern pattern
    wrong_letters = trials.split('').delete_if do |c|
      pattern.include? c
    end.join('')
    matched_word = filter_words_of_wrong_letters! matched_word, wrong_letters
    max_frequency_letter (build_frequency_tables matched_word), trials
  end
end